let scrollElems=document.getElementsByClassName("scrollPage"),article=document.querySelector(".article"),durationTime=[400,600,800],indexOfSlowest=durationTime.indexOf(Math.max(...durationTime)),durationSetAdditional=[300,300,300],durationTimeBG=[];for(let i=0;i<durationTime.length;i++)durationTimeBG[i]=durationTime[i]+2*durationSetAdditional[i];let currentProgress,durationZero=[0,0,0],pow=2,gradDBA={color:[[231,78,44],[254,156,100]]},gradMustang={color:[[85,75,161],[105,199,237]]},grad={},compareGrad={},currentGrad={color:[[],[]]},slidePhones=document.getElementsByClassName("col-slide"),initTop=[],finalTop=[],phoneHeight=.6*window.innerHeight,cecilElems=[document.getElementsByClassName("colLeftCecil"),document.getElementsByClassName("colCenterCecil"),document.getElementsByClassName("colRightCecil")],dbaElems=[document.getElementsByClassName("colLeftDBA"),document.getElementsByClassName("colCenterDBA"),document.getElementsByClassName("colRightDBA")],distance=window.innerHeight;function animate({timing,draw,duration}){let start=performance.now();requestAnimationFrame(function animate(time){let timeFraction=(time-start)/duration;timeFraction>1&&(timeFraction=1);let progress=timing(timeFraction);draw(progress),timeFraction<1&&requestAnimationFrame(animate)})}function change(paramGrad1,paramGrad2,element,timeDurationSet){(grad={...paramGrad1}).color=[...paramGrad1.color],compareGrad.color=[...paramGrad2.color],compareGrad={...paramGrad2};for(let j=0;j<grad.color.length;j++)grad.color[j]=[...paramGrad1.color[j]],compareGrad.color[j]=[...paramGrad2.color[j]];bgColor(element,timeDurationSet)}function bgColor(elem,setDuration){return animate({duration:Math.max(...setDuration),timing:function(timeFraction){return timeFraction},draw:function(progress){for(let i=0;i<2;i++)for(let j=0;j<3;j++)currentGrad.color[i][j]=grad.color[i][j]+(compareGrad.color[i][j]-grad.color[i][j])*progress;elem.style.backgroundImage="linear-gradient(117deg, rgb("+currentGrad.color[0]+"), rgb("+currentGrad.color[1]+"))"}})}function currentPos(){for(let i=0;i<scrollElems.length;i++)if(window.scrollY+window.innerHeight/2>=scrollElems[i].offsetTop&&window.scrollY+window.innerHeight/2<scrollElems[i].offsetTop+scrollElems[i].clientHeight)return i}function currentPosStrict(){for(let i=0;i<scrollElems.length;i++)if(window.scrollY>=scrollElems[i].offsetTop&&window.scrollY<scrollElems[i].offsetTop+scrollElems[i].clientHeight)return i}function dbaSection(){for(let i=0;i<scrollElems.length;i++)if("dbafitness"==scrollElems[i].id)return i}function mustangSection(){for(let i=0;i<scrollElems.length;i++)if("mustangchain"==scrollElems[i].id)return i}function mobileMove(durationSet){return startTopArray=currentProgress,new Promise((res,rej)=>{for(let index=0;index<slidePhones.length;index++)animate({duration:durationSet[index],timing:function(timeFraction){return Math.pow(timeFraction,pow)},draw:function(progress){slidePhones[index].style.transform="translateY("+(progress*finalTopArray[index]+(1-progress)*startTopArray[index])+"px)",currentProgress[index]=progress*finalTopArray[index]+(1-progress)*startTopArray[index],1==progress&&index==indexOfSlowest&&res()}})})}let finalDestinationBottom,finalDestinationTop,currentTopCecil=[],newTopCecil=[],currentTopDBA=[],newTopDBA=[];function topMove(durationSet){return new Promise((res,rej)=>{for(let index=0;index<slidePhones.length;index++)newTopCecil[index]||(newTopCecil[index]=0),currentTopCecil[index]=newTopCecil[index],finalDestinationTop=finalDestinationTop==-1*distance?-1*distance:0,animate({duration:durationSet[index],timing:function(timeFraction){return Math.pow(timeFraction,pow)},draw:function(progress){for(let i=0;i<cecilElems[index].length;i++)cecilElems[index][i].style.transform="translateY("+((1-progress)*currentTopCecil[index]+progress*finalDestinationTop)+"px)";newTopCecil[index]=(1-progress)*currentTopCecil[index]+progress*finalDestinationTop,1==progress&&index==indexOfSlowest&&res()}})})}function bottomMove(durationSet){return new Promise((res,rej)=>{for(let index=0;index<slidePhones.length;index++)newTopDBA[index]||(newTopDBA[index]=0),currentTopDBA[index]=newTopDBA[index],finalDestinationBottom=finalDestinationBottom==distance?distance:0,animate({duration:durationSet[index],timing:function(timeFraction){return Math.pow(timeFraction,pow)},draw:function(progress){for(let i=0;i<dbaElems[index].length;i++)dbaElems[index][i].style.transform="translateY("+((1-progress)*currentTopDBA[index]+progress*finalDestinationBottom)+"px)";newTopDBA[index]=(1-progress)*currentTopDBA[index]+progress*finalDestinationBottom,1==progress&&index==indexOfSlowest&&res()}})})}window.addEventListener("load",function(){let shiftTop=[0,.22*window.innerHeight,.02*window.innerHeight],shiftBottom=[.4*window.innerHeight,.22*window.innerHeight,2*phoneHeight];for(let i=0;i<slidePhones.length;i++)initTop[i]=slidePhones[i].offsetTop+shiftTop[i];for(let i=0;i<slidePhones.length;i++)finalTop[i]=initTop[i]+5.3*phoneHeight-shiftTop[i]-shiftBottom[i];currentPos()>dbaSection()?(firstEnterMustang=!1,firstEnterDBA=!0,async function(){newTopDBA=[0,0,0],finalDestinationBottom=distance,newTopCecil=[-1*distance,-1*distance,-1*distance],finalDestinationTop=0,currentProgress=[...initTop],finalTopArray=[...finalTop],await topMove(durationZero),await mobileMove(durationZero),await bottomMove(durationZero)}(),change(gradDBA,gradMustang,article,durationZero)):(firstEnterDBA=!1,firstEnterMustang=!0,async function(){newTopDBA=[distance,distance,distance],finalDestinationBottom=0,newTopCecil=[0,0,0],finalDestinationTop=-1*distance,currentProgress=[...finalTop],finalTopArray=[...initTop],await bottomMove(durationZero),await mobileMove(durationZero),await topMove(durationZero)}(),change(gradMustang,gradDBA,article,durationZero)),document.addEventListener("scroll",function(event){currentPos()==dbaSection()&&1==firstEnterDBA?(change(currentGrad,gradDBA,article,durationTimeBG),async function(){finalDestinationBottom=0,finalDestinationTop=-1*distance,finalTopArray=[...initTop],await bottomMove(durationSetAdditional),await mobileMove(durationTime),await topMove(durationSetAdditional)}(),firstEnterDBA=!1,firstEnterMustang=!0):currentPos()==mustangSection()&&1==firstEnterMustang&&(change(currentGrad,gradMustang,article,durationTimeBG),async function(){finalDestinationTop=0,finalTopArray=[...finalTop],finalDestinationBottom=distance,await topMove(durationSetAdditional),await mobileMove(durationTime),await bottomMove(durationSetAdditional)}(),firstEnterMustang=!1,firstEnterDBA=!0)})});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFZhcmlhYmxlc1xyXG5sZXQgc2Nyb2xsRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzY3JvbGxQYWdlJyk7XHJcbmxldCBhcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFydGljbGUnKTtcclxubGV0IGR1cmF0aW9uVGltZSA9IFs0MDAsIDYwMCwgODAwXTsgLy90aW1lIG9mIGFuaW1hdGlvbiBkdXJhdGlvbiBmb3IgbW9iaWxlXHJcbmxldCBpbmRleE9mU2xvd2VzdCA9IGR1cmF0aW9uVGltZS5pbmRleE9mKE1hdGgubWF4KC4uLmR1cmF0aW9uVGltZSkpO1xyXG5sZXQgZHVyYXRpb25TZXRBZGRpdGlvbmFsID0gWzMwMCwgMzAwLCAzMDBdOyAvL3RpbWUgb2YgYW5pbWF0aW9uIG9mIGFkZGl0aW9uYWwgc3RlcHMgb2Ygc3BsaXR0aW5nIGFuZCBkcmFnZ2luZyBtb2JpbGUgcGhvbmVzXHJcbmxldCBkdXJhdGlvblRpbWVCRyA9IFtdOyAvL3RpbWUgb2YgYW5pbWF0aW9uIGZvciBiZ0NvbG9yIGNoYW5nZTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCBkdXJhdGlvblRpbWUubGVuZ3RoOyBpKyspIHtcclxuICBkdXJhdGlvblRpbWVCR1tpXSA9IGR1cmF0aW9uVGltZVtpXSArIGR1cmF0aW9uU2V0QWRkaXRpb25hbFtpXSoyO1xyXG59XHJcblxyXG5sZXQgZHVyYXRpb25aZXJvID0gWzAsIDAsIDBdO1xyXG5sZXQgcG93ID0gMjsgLy9wb3dlciBvZiB0aW1pbmcgZnVuY3Rpb25cclxubGV0IGdyYWREQkEgPSB7XHJcbiAgY29sb3I6IFtbMjMxLDc4LDQ0XSwgWzI1NCwxNTYsMTAwXV0sXHJcbn1cclxubGV0IGdyYWRNdXN0YW5nID0ge1xyXG4gIGNvbG9yOiBbWzg1LDc1LDE2MV0sIFsxMDUsMTk5LDIzN11dLFxyXG59XHJcbmxldCBncmFkID0ge307XHJcbmxldCBjb21wYXJlR3JhZCA9IHt9O1xyXG5sZXQgY3VycmVudEdyYWQgPSB7XHJcbiAgY29sb3I6IFtbXSxbXV0sXHJcbn07XHJcbmxldCBjdXJyZW50UHJvZ3Jlc3M7XHJcbmxldCBzbGlkZVBob25lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbC1zbGlkZScpOyAvL2FuaW1hdGVkIHBob25lcyBjb2x1bW5zXHJcbmxldCBpbml0VG9wID0gW107IC8vYXJyYXkgb2YgaW5pdGlhbCB0b3AgdmFsdWVzIG9mIGNvbHVtbnNcclxubGV0IGZpbmFsVG9wID0gW107IC8vYXJyYXkgb2YgZmluYWwgdG9wIHZhbHVlcyBvZiBjb2x1bW5zXHJcbmxldCBwaG9uZUhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCowLjY7XHJcbmxldCBjZWNpbEVsZW1zID0gW2RvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbExlZnRDZWNpbCcpLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb2xDZW50ZXJDZWNpbCcpLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb2xSaWdodENlY2lsJyldO1xyXG5sZXQgZGJhRWxlbXMgPSBbZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29sTGVmdERCQScpLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb2xDZW50ZXJEQkEnKSwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29sUmlnaHREQkEnKV07XHJcbmxldCBkaXN0YW5jZSA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbi8vcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIGFuaW1hdGUoe3RpbWluZywgZHJhdywgZHVyYXRpb259KSB7XHJcbiAgbGV0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uIGFuaW1hdGUodGltZSkge1xyXG4gICAgLy8gdGltZUZyYWN0aW9uINC40LfQvNC10L3Rj9C10YLRgdGPINC+0YIgMCDQtNC+IDFcclxuICAgIGxldCB0aW1lRnJhY3Rpb24gPSAodGltZSAtIHN0YXJ0KSAvIChkdXJhdGlvbik7XHJcbiAgICBpZiAodGltZUZyYWN0aW9uID4gMSkgdGltZUZyYWN0aW9uID0gMTtcclxuICAgIC8vINCy0YvRh9C40YHQu9C10L3QuNC1INGC0LXQutGD0YnQtdCz0L4g0YHQvtGB0YLQvtGP0L3QuNGPINCw0L3QuNC80LDRhtC40LhcclxuICAgIGxldCBwcm9ncmVzcyA9IHRpbWluZyh0aW1lRnJhY3Rpb24pO1xyXG4gICAgZHJhdyhwcm9ncmVzcyk7IC8vINC+0YLRgNC40YHQvtCy0LDRgtGMINC10ZFcclxuICAgIGlmICh0aW1lRnJhY3Rpb24gPCAxKSB7XHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLy9iZyBhbmltYXRpb25cclxuZnVuY3Rpb24gY2hhbmdlKHBhcmFtR3JhZDEsIHBhcmFtR3JhZDIsIGVsZW1lbnQsIHRpbWVEdXJhdGlvblNldCkge1xyXG4gIGdyYWQgPSB7Li4ucGFyYW1HcmFkMX07XHJcbiAgZ3JhZC5jb2xvciA9IFsuLi5wYXJhbUdyYWQxLmNvbG9yXTtcclxuICBjb21wYXJlR3JhZC5jb2xvciA9IFsuLi5wYXJhbUdyYWQyLmNvbG9yXTtcclxuICBjb21wYXJlR3JhZCA9IHsuLi5wYXJhbUdyYWQyfTtcclxuXHJcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBncmFkLmNvbG9yLmxlbmd0aDsgaisrKSB7XHJcbiAgICBncmFkLmNvbG9yW2pdID0gWy4uLnBhcmFtR3JhZDEuY29sb3Jbal1dO1xyXG4gICAgY29tcGFyZUdyYWQuY29sb3Jbal0gPSBbLi4ucGFyYW1HcmFkMi5jb2xvcltqXV07XHJcbiAgfVxyXG4gIFxyXG4gIGJnQ29sb3IoZWxlbWVudCwgdGltZUR1cmF0aW9uU2V0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYmdDb2xvcihlbGVtLCBzZXREdXJhdGlvbikge1xyXG4gIHJldHVybiBhbmltYXRlKHtcclxuICAgIGR1cmF0aW9uOiBNYXRoLm1heCguLi5zZXREdXJhdGlvbiksXHJcbiAgICB0aW1pbmc6IGZ1bmN0aW9uICh0aW1lRnJhY3Rpb24pIHtcclxuICAgICAgcmV0dXJuIHRpbWVGcmFjdGlvbjtcclxuICAgIH0sXHJcbiAgICBkcmF3OiBmdW5jdGlvbihwcm9ncmVzcykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMzsgaisrKSB7XHJcbiAgICAgICAgICBjdXJyZW50R3JhZC5jb2xvcltpXVtqXSA9IChncmFkLmNvbG9yW2ldW2pdICsgKGNvbXBhcmVHcmFkLmNvbG9yW2ldW2pdLWdyYWQuY29sb3JbaV1bal0pICogcHJvZ3Jlc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgZWxlbS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAoJ2xpbmVhci1ncmFkaWVudCgxMTdkZWcsIHJnYignK2N1cnJlbnRHcmFkLmNvbG9yWzBdKycpLCByZ2IoJytjdXJyZW50R3JhZC5jb2xvclsxXSsnKSknKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3VycmVudFBvcygpIHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcm9sbEVsZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoKHdpbmRvdy5zY3JvbGxZICsgd2luZG93LmlubmVySGVpZ2h0LzIpID49IHNjcm9sbEVsZW1zW2ldLm9mZnNldFRvcCAmJiAod2luZG93LnNjcm9sbFkgKyB3aW5kb3cuaW5uZXJIZWlnaHQvMikgPCBzY3JvbGxFbGVtc1tpXS5vZmZzZXRUb3AgKyBzY3JvbGxFbGVtc1tpXS5jbGllbnRIZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIGk7XHJcbiAgICB9ICBcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGN1cnJlbnRQb3NTdHJpY3QoKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JvbGxFbGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKCh3aW5kb3cuc2Nyb2xsWSkgPj0gc2Nyb2xsRWxlbXNbaV0ub2Zmc2V0VG9wICYmICh3aW5kb3cuc2Nyb2xsWSkgPCBzY3JvbGxFbGVtc1tpXS5vZmZzZXRUb3AgKyBzY3JvbGxFbGVtc1tpXS5jbGllbnRIZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIGk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkYmFTZWN0aW9uKCkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2Nyb2xsRWxlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChzY3JvbGxFbGVtc1tpXS5pZCA9PSBcImRiYWZpdG5lc3NcIikge1xyXG4gICAgICByZXR1cm4gaTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG11c3RhbmdTZWN0aW9uKCkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2Nyb2xsRWxlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChzY3JvbGxFbGVtc1tpXS5pZCA9PSBcIm11c3RhbmdjaGFpblwiKSB7XHJcbiAgICAgIHJldHVybiBpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy9mb3IgcGhvbmVzIGFuaW1hdGlvblxyXG5mdW5jdGlvbiBtb2JpbGVNb3ZlKGR1cmF0aW9uU2V0KSB7XHJcbiAgc3RhcnRUb3BBcnJheSA9IGN1cnJlbnRQcm9ncmVzcztcclxuICBcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2xpZGVQaG9uZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGFuaW1hdGUoe1xyXG4gICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblNldFtpbmRleF0sXHJcbiAgICAgICAgdGltaW5nOiBmdW5jdGlvbiAodGltZUZyYWN0aW9uKSB7XHJcbiAgICAgICAgICByZXR1cm4gTWF0aC5wb3codGltZUZyYWN0aW9uLCBwb3cpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkcmF3OiBmdW5jdGlvbihwcm9ncmVzcykge1xyXG4gICAgICAgICAgc2xpZGVQaG9uZXNbaW5kZXhdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKCcrKCgocHJvZ3Jlc3MgKiBmaW5hbFRvcEFycmF5W2luZGV4XSkgKyAoKDEtcHJvZ3Jlc3MpKnN0YXJ0VG9wQXJyYXlbaW5kZXhdKSkpKydweCknO1xyXG4gICAgICAgICAgY3VycmVudFByb2dyZXNzW2luZGV4XSA9IChwcm9ncmVzcyAqIGZpbmFsVG9wQXJyYXlbaW5kZXhdKSArICgoMS1wcm9ncmVzcykqc3RhcnRUb3BBcnJheVtpbmRleF0pO1xyXG4gICAgXHJcbiAgICAgICAgICBpZiAocHJvZ3Jlc3MgPT0gMSAmJiBpbmRleCA9PSBpbmRleE9mU2xvd2VzdCkge1xyXG4gICAgICAgICAgICByZXMoKTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5sZXQgY3VycmVudFRvcENlY2lsID0gW107XHJcbmxldCBuZXdUb3BDZWNpbCA9IFtdO1xyXG5sZXQgY3VycmVudFRvcERCQSA9IFtdO1xyXG5sZXQgbmV3VG9wREJBID0gW107XHJcbmxldCBmaW5hbERlc3RpbmF0aW9uQm90dG9tO1xyXG5sZXQgZmluYWxEZXN0aW5hdGlvblRvcDtcclxuXHJcbmZ1bmN0aW9uIHRvcE1vdmUoZHVyYXRpb25TZXQpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2xpZGVQaG9uZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmICghbmV3VG9wQ2VjaWxbaW5kZXhdKSB7XHJcbiAgICAgICAgbmV3VG9wQ2VjaWxbaW5kZXhdID0gMDtcclxuICAgICAgfVxyXG4gICAgICBjdXJyZW50VG9wQ2VjaWxbaW5kZXhdID0gbmV3VG9wQ2VjaWxbaW5kZXhdO1xyXG4gICAgICBpZiAoZmluYWxEZXN0aW5hdGlvblRvcCA9PSBkaXN0YW5jZSooLTEpKSB7XHJcbiAgICAgICAgZmluYWxEZXN0aW5hdGlvblRvcCA9IGRpc3RhbmNlKigtMSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmaW5hbERlc3RpbmF0aW9uVG9wID0gMFxyXG4gICAgICB9XHJcblxyXG4gICAgICBhbmltYXRlKHtcclxuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25TZXRbaW5kZXhdLFxyXG4gICAgICAgIHRpbWluZzogZnVuY3Rpb24gKHRpbWVGcmFjdGlvbikge1xyXG4gICAgICAgICAgcmV0dXJuIE1hdGgucG93KHRpbWVGcmFjdGlvbiwgcG93KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZHJhdzogZnVuY3Rpb24ocHJvZ3Jlc3MpIHtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2VjaWxFbGVtc1tpbmRleF0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2VjaWxFbGVtc1tpbmRleF1baV0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoJysoKDEtcHJvZ3Jlc3MpKmN1cnJlbnRUb3BDZWNpbFtpbmRleF0gKyBwcm9ncmVzcyooZmluYWxEZXN0aW5hdGlvblRvcCkpKydweCknO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbmV3VG9wQ2VjaWxbaW5kZXhdID0gKDEtcHJvZ3Jlc3MpKmN1cnJlbnRUb3BDZWNpbFtpbmRleF0gKyBwcm9ncmVzcyooZmluYWxEZXN0aW5hdGlvblRvcCk7XHJcbiAgICBcclxuICAgICAgICAgIGlmIChwcm9ncmVzcyA9PSAxICYmIGluZGV4ID09IGluZGV4T2ZTbG93ZXN0KSB7XHJcbiAgICAgICAgICAgIHJlcygpO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJvdHRvbU1vdmUoZHVyYXRpb25TZXQpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2xpZGVQaG9uZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGlmICghbmV3VG9wREJBW2luZGV4XSkge1xyXG4gICAgICAgIG5ld1RvcERCQVtpbmRleF0gPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIGN1cnJlbnRUb3BEQkFbaW5kZXhdID0gbmV3VG9wREJBW2luZGV4XTtcclxuICAgICAgaWYgKGZpbmFsRGVzdGluYXRpb25Cb3R0b20gPT0gZGlzdGFuY2UpIHtcclxuICAgICAgICBmaW5hbERlc3RpbmF0aW9uQm90dG9tID0gZGlzdGFuY2VcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmaW5hbERlc3RpbmF0aW9uQm90dG9tID0gMFxyXG4gICAgICB9XHJcblxyXG4gICAgICBhbmltYXRlKHtcclxuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25TZXRbaW5kZXhdLFxyXG4gICAgICAgIHRpbWluZzogZnVuY3Rpb24gKHRpbWVGcmFjdGlvbikge1xyXG4gICAgICAgICAgcmV0dXJuIE1hdGgucG93KHRpbWVGcmFjdGlvbiwgcG93KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZHJhdzogZnVuY3Rpb24ocHJvZ3Jlc3MpIHtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGJhRWxlbXNbaW5kZXhdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRiYUVsZW1zW2luZGV4XVtpXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgnKygoMS1wcm9ncmVzcykqY3VycmVudFRvcERCQVtpbmRleF0gKyBwcm9ncmVzcyooZmluYWxEZXN0aW5hdGlvbkJvdHRvbSkpKydweCknO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbmV3VG9wREJBW2luZGV4XSA9ICgxLXByb2dyZXNzKSpjdXJyZW50VG9wREJBW2luZGV4XSArIHByb2dyZXNzKihmaW5hbERlc3RpbmF0aW9uQm90dG9tKTtcclxuXHJcbiAgICAgICAgICBpZiAocHJvZ3Jlc3MgPT0gMSAmJiBpbmRleCA9PSBpbmRleE9mU2xvd2VzdCkge1xyXG4gICAgICAgICAgICByZXMoKTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KVxyXG59XHJcbi8vZW5kXHJcblxyXG4vL2V4ZWN1dGluZ1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKXtcclxuICBsZXQgc2hpZnRUb3AgPSBbMCwgd2luZG93LmlubmVySGVpZ2h0KjAuMjIsIHdpbmRvdy5pbm5lckhlaWdodCowLjAyXTtcclxuICBsZXQgc2hpZnRCb3R0b20gPSBbd2luZG93LmlubmVySGVpZ2h0KjAuNCwgd2luZG93LmlubmVySGVpZ2h0KjAuMjIsIHBob25lSGVpZ2h0KjJdXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVQaG9uZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGluaXRUb3BbaV0gPSBzbGlkZVBob25lc1tpXS5vZmZzZXRUb3AgKyBzaGlmdFRvcFtpXTtcclxuICB9XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZVBob25lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgZmluYWxUb3BbaV0gPSAoaW5pdFRvcFtpXSArIDUuMypwaG9uZUhlaWdodCAtIHNoaWZ0VG9wW2ldIC0gc2hpZnRCb3R0b21baV0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKGN1cnJlbnRQb3MoKSA+IGRiYVNlY3Rpb24oKSkge1xyXG4gICAgZmlyc3RFbnRlck11c3RhbmcgPSBmYWxzZTtcclxuICAgIGZpcnN0RW50ZXJEQkEgPSB0cnVlO1xyXG4gICAgXHJcbiAgICAoYXN5bmMgZnVuY3Rpb24oKSB7XHJcbiAgICAgIG5ld1RvcERCQSA9IFswLCAwLCAwXTtcclxuICAgICAgZmluYWxEZXN0aW5hdGlvbkJvdHRvbSA9IGRpc3RhbmNlO1xyXG4gICAgICBuZXdUb3BDZWNpbCA9IFsoLTEpKmRpc3RhbmNlLCAoLTEpKmRpc3RhbmNlLCAoLTEpKmRpc3RhbmNlXTtcclxuICAgICAgZmluYWxEZXN0aW5hdGlvblRvcCA9IDA7XHJcbiAgICAgIGN1cnJlbnRQcm9ncmVzcyA9IFsuLi5pbml0VG9wXTtcclxuICAgICAgZmluYWxUb3BBcnJheSA9IFsuLi5maW5hbFRvcF07XHJcblxyXG4gICAgICBhd2FpdCB0b3BNb3ZlKGR1cmF0aW9uWmVybyk7XHJcbiAgICAgIGF3YWl0IG1vYmlsZU1vdmUoZHVyYXRpb25aZXJvKTtcclxuICAgICAgYXdhaXQgYm90dG9tTW92ZShkdXJhdGlvblplcm8pO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBjaGFuZ2UoZ3JhZERCQSwgZ3JhZE11c3RhbmcsIGFydGljbGUsIGR1cmF0aW9uWmVybyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGZpcnN0RW50ZXJEQkEgPSBmYWxzZTtcclxuICAgIGZpcnN0RW50ZXJNdXN0YW5nID0gdHJ1ZTtcclxuXHJcbiAgICAoYXN5bmMgZnVuY3Rpb24oKSB7XHJcbiAgICAgIG5ld1RvcERCQSA9IFtkaXN0YW5jZSwgZGlzdGFuY2UsIGRpc3RhbmNlXTtcclxuICAgICAgZmluYWxEZXN0aW5hdGlvbkJvdHRvbSA9IDA7XHJcbiAgICAgIG5ld1RvcENlY2lsID0gWzAsIDAsIDBdO1xyXG4gICAgICBmaW5hbERlc3RpbmF0aW9uVG9wID0gKC0xKSpkaXN0YW5jZTtcclxuICAgICAgY3VycmVudFByb2dyZXNzID0gWy4uLmZpbmFsVG9wXTtcclxuICAgICAgZmluYWxUb3BBcnJheSA9IFsuLi5pbml0VG9wXTtcclxuXHJcbiAgICAgIGF3YWl0IGJvdHRvbU1vdmUoZHVyYXRpb25aZXJvKTtcclxuICAgICAgYXdhaXQgbW9iaWxlTW92ZShkdXJhdGlvblplcm8pO1xyXG4gICAgICBhd2FpdCB0b3BNb3ZlKGR1cmF0aW9uWmVybyk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGNoYW5nZShncmFkTXVzdGFuZywgZ3JhZERCQSwgYXJ0aWNsZSwgZHVyYXRpb25aZXJvKTtcclxuICB9XHJcbiAgXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgaWYgKGN1cnJlbnRQb3MoKSA9PSBkYmFTZWN0aW9uKCkgJiYgZmlyc3RFbnRlckRCQSA9PSB0cnVlKSB7XHJcblxyXG4gICAgY2hhbmdlKGN1cnJlbnRHcmFkLCBncmFkREJBLCBhcnRpY2xlLCBkdXJhdGlvblRpbWVCRyk7XHJcbiAgICBcclxuICAgIChhc3luYyBmdW5jdGlvbigpIHtcclxuICAgICAgICBmaW5hbERlc3RpbmF0aW9uQm90dG9tID0gMDtcclxuICAgICAgICBmaW5hbERlc3RpbmF0aW9uVG9wID0gKC0xKSpkaXN0YW5jZTtcclxuICAgICAgICBmaW5hbFRvcEFycmF5ID0gWy4uLmluaXRUb3BdO1xyXG5cclxuICAgICAgICBhd2FpdCBib3R0b21Nb3ZlKGR1cmF0aW9uU2V0QWRkaXRpb25hbCk7XHJcbiAgICAgICAgYXdhaXQgbW9iaWxlTW92ZShkdXJhdGlvblRpbWUpO1xyXG4gICAgICAgIGF3YWl0IHRvcE1vdmUoZHVyYXRpb25TZXRBZGRpdGlvbmFsKTtcclxuICAgIH0pKCk7XHJcbiAgICBcclxuICAgIGZpcnN0RW50ZXJEQkEgPSBmYWxzZTtcclxuICAgIGZpcnN0RW50ZXJNdXN0YW5nID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoY3VycmVudFBvcygpID09IG11c3RhbmdTZWN0aW9uKCkgJiYgZmlyc3RFbnRlck11c3RhbmcgPT0gdHJ1ZSkge1xyXG5cclxuICAgIGNoYW5nZShjdXJyZW50R3JhZCwgZ3JhZE11c3RhbmcsIGFydGljbGUsIGR1cmF0aW9uVGltZUJHKTtcclxuXHJcbiAgICAoYXN5bmMgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZmluYWxEZXN0aW5hdGlvblRvcCA9IDA7XHJcbiAgICAgICAgZmluYWxUb3BBcnJheSA9IFsuLi5maW5hbFRvcF07XHJcbiAgICAgICAgZmluYWxEZXN0aW5hdGlvbkJvdHRvbSA9IGRpc3RhbmNlO1xyXG5cclxuICAgICAgICBhd2FpdCB0b3BNb3ZlKGR1cmF0aW9uU2V0QWRkaXRpb25hbCk7XHJcbiAgICAgICAgYXdhaXQgbW9iaWxlTW92ZShkdXJhdGlvblRpbWUpO1xyXG4gICAgICAgIGF3YWl0IGJvdHRvbU1vdmUoZHVyYXRpb25TZXRBZGRpdGlvbmFsKTtcclxuXHJcbiAgICAgICAgLy8gdG9wTW92ZShkdXJhdGlvblRpbWUpXHJcbiAgICAgICAgLy8gbW9iaWxlTW92ZShkdXJhdGlvblRpbWUpXHJcbiAgICAgICAgLy8gYm90dG9tTW92ZShkdXJhdGlvblRpbWUpXHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGZpcnN0RW50ZXJNdXN0YW5nID0gZmFsc2U7XHJcbiAgICBmaXJzdEVudGVyREJBID0gdHJ1ZTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbn0pOyJdLCJmaWxlIjoibWFpbi5qcyJ9
