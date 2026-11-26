/* Display-only cards. No new timestamps are generated. */
(function(root){
 function splitCaptions(text,width=42){
  const result=[];let line='',lines=[],start=null,end=0;
  const flush=()=>{if(start===null)return;if(line)lines.push(line);result.push({start,end,raw:text.slice(start,end),display:lines.join('\n')});line='';lines=[];start=null};
  for(const m of text.matchAll(/\[[^\]]+\]|\S+/g)){
   let display=m[0].startsWith('[')?'[Нужно прослушать]':m[0];
   if(display.length>width)display=display.slice(0,width-1)+'…';
   if(line&&line.length+1+display.length>width){lines.push(line);line='';if(lines.length===2)flush()}
   if(start===null)start=m.index;
   line+=(line?' ':'')+display;end=m.index+m[0].length;
   if(/[.!?…][»”"]?$/.test(m[0])&&!m[0].startsWith('['))flush();
  }
  flush();return result.length?result:[{start:0,end:text.length,raw:text,display:text}];
 }
 if(typeof module!=='undefined')module.exports={splitCaptions};else root.splitCaptions=splitCaptions;
})(typeof window!=='undefined'?window:globalThis);
