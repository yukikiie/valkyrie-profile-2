// Uses Git Credential Manager's existing Windows credential store; never prints tokens.
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const root=path.resolve(__dirname,'..');
const owner='yukikiie';
const repoName='valkyrie-profile-2';
const remote=`https://github.com/${owner}/${repoName}.git`;
const env={...process.env,GIT_TERMINAL_PROMPT:'0',GCM_INTERACTIVE:'never'};
function git(args,options={}){const r=spawnSync('git',args,{cwd:root,env,encoding:'utf8',windowsHide:true,...options});if(r.error)throw r.error;if(r.status!==0)throw Error((r.stderr||r.stdout||'git failed').trim());return r.stdout.trim();}
async function main(){
  const raw=git(['credential','fill'],{input:`protocol=https\nhost=github.com\nusername=${owner}\n\n`});
  const credential=Object.fromEntries(raw.split(/\r?\n/).filter(l=>l.includes('=')).map(l=>[l.slice(0,l.indexOf('=')),l.slice(l.indexOf('=')+1)]));
  if(!credential.password)throw Error('GitHub login is required. Run: git credential-manager github login --username yukikiie --device --no-ui');
  const headers={'Authorization':'Bearer '+credential.password,'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2026-03-10','User-Agent':'Yukikiie-VP2-Guide','Content-Type':'application/json'};
  async function api(method,url,body,accept=[]){const r=await fetch('https://api.github.com'+url,{method,headers,body:body==null?undefined:JSON.stringify(body)});const json=await r.text();const data=json?JSON.parse(json):{};if(!r.ok&&!accept.includes(r.status))throw Error(`GitHub ${method} ${url}: ${r.status} ${data.message||''}`);return {status:r.status,data};}
  const user=(await api('GET','/user')).data;
  if(user.login.toLowerCase()!==owner)throw Error('The signed-in GitHub account does not match yukikiie.');
  const repository=await api('GET',`/repos/${owner}/${repoName}`,null,[404]);
  if(repository.status===404){await api('POST','/user/repos',{name:repoName,description:'女神戰記 2：希爾梅莉亞｜繁體中文研究攻略與可搜尋圖鑑',homepage:`https://${owner}.github.io/${repoName}/`,private:false,auto_init:false});console.log('Created repository '+owner+'/'+repoName);}
  if(!fs.existsSync(path.join(root,'.git')))git(['init','-b','main']);
  const existing=spawnSync('git',['remote','get-url','origin'],{cwd:root,encoding:'utf8',windowsHide:true});
  if(existing.status===0&&existing.stdout.trim()!==remote)throw Error('Existing origin is different; no remote was changed.');
  if(existing.status!==0)git(['remote','add','origin',remote]);
  // Existing populated repositories require a reviewable branch; never overwrite history.
  const upstream=git(['ls-remote','--heads','origin','main']);
  const localHead=spawnSync('git',['rev-parse','--verify','HEAD'],{cwd:root,encoding:'utf8',windowsHide:true});
  if(upstream&&localHead.status!==0)throw Error('Target repository is already populated; integrate its history before publishing.');
  git(['add','--','index.html','fonts.css','styles.css','app.js','location-ui.js','assets','data','research','scripts','README.md','.gitignore','.gitattributes','.nojekyll','.github']);
  const staged=spawnSync('git',['diff','--cached','--quiet'],{cwd:root,windowsHide:true});
  if(staged.status===1)git(['-c','user.name='+owner,'-c',`user.email=${user.id}+${owner}@users.noreply.github.com`,'commit','-m','Build researched Traditional Chinese Valkyrie Profile 2 guide']);
  git(['push','-u','origin','main']);
  let pages=await api('GET',`/repos/${owner}/${repoName}/pages`,null,[404]);
  if(pages.status===404)pages=await api('POST',`/repos/${owner}/${repoName}/pages`,{build_type:'workflow'});
  else if(pages.data.build_type!=='workflow')pages=await api('PUT',`/repos/${owner}/${repoName}/pages`,{build_type:'workflow'});
  await api('POST',`/repos/${owner}/${repoName}/actions/workflows/pages.yml/dispatches`,{ref:'main'});
  console.log(JSON.stringify({repository:`https://github.com/${owner}/${repoName}`,url:pages.data.html_url||`https://${owner}.github.io/${repoName}/`,status:'deployment requested'},null,2));
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
