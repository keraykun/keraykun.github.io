window.addEventListener('DOMContentLoaded',()=>{
	window.addEventListener('resize',()=>{
		 let menu = document.querySelector('.menu-btn')
		let hamburger = document.querySelector('#hamburger')
		if(window.innerWidth>768){
		 hamburger.style.display='flex'
		  menu.classList.add('open');
		}else{
		 menu.classList.remove('open');
		hamburger.style.display='none'
		 }
	})
  const nav = new IntersectionObserver(navFunction,{rootMargin:'-50% 0px'})
  const aside = new IntersectionObserver(asideFunction,{rootMargin:'-50% 0px'})
  const side = new IntersectionObserver(sideFunction,{rootMargin:'-50% 0px'})
  const items = new IntersectionObserver(itemsFunction,{rootMargin:'-50% 0px'})
  const development = new IntersectionObserver(developmentFunction,{threshold:0.5})
  
  development.observe(document.querySelector('div.development'))
	
  document.querySelectorAll('.nav-scroll-list').forEach(div=>{
  	nav.observe(div)
  })
  document.querySelectorAll('.aside-scroll-list').forEach(div=>{
  	aside.observe(div)
  })
  document.querySelectorAll('.side-scroll-list').forEach(div=>{
  	side.observe(div)
  })
  document.querySelectorAll('div.items').forEach(item=>{
	items.observe(item)
  })
	
  let frameworks = document.querySelectorAll('section article div#framework ul li')
  frameworks.forEach(frameworkFunction)
  let procedurals = document.querySelectorAll('section article div#procedural ul li')
  procedurals.forEach(proceduralFunction)

})
  function navFunction(elements){
    elements.forEach(element=>{
     const navObject = {
	     	id: element.target.getAttribute('id'),
	     	menuLink:function(){
	     		return document.querySelector('nav ul li a[href*='+this.id+']')
	     	},
	     	add:function(){
	     		  this.menuLink().classList.add('active');
	     	},
	     	remove:function(){
	     		 this.menuLink().classList.remove('active');	
	     	}	
     	}	
    	navObject.menuLink()!=undefined ?
    		element.isIntersecting ?
    		navObject.add() : navObject.remove():''
    	
    })
  }
  function asideFunction(elements){
     elements.forEach(element=>{ 
     const asideObject = {
      	id:element.target.getAttribute('id'),
      	text: element.target.querySelector('.main-title'),
      	opacity:element.target.querySelector('.main-content'),
      	slide: element.target.querySelector('.translate-X'),
      	createImg:document.createElement('img'),
      	menuLink:function(){
      		 return document.querySelector('aside ul li a[href*='+this.id+']')
      	},
      	AnimationFadeIn:function(){
      		this.opacity.style.setProperty('--opacity','0.4')
     	   	this.slide.classList.remove('translateRemove')
     	   	this.text.classList.add('active-list');
     	   	this.menuLink().classList.add('active-list');    
     	   	this.menuLink().appendChild(this.createImg)	
      	},
      	AnimationFadeOut:function(){
      		this.opacity.style.setProperty('--opacity','0.1')
	      	this.slide.classList.add('translateRemove')
	        this.text.classList.remove('active-list');
	        this.menuLink().classList.remove('active-list');
      	},
      	image:function(){
      		this.createImg.src='icons/minus.png'
      	},
      	imageStyle:function(){
      		 this.createImg.style.width='30px';	
			 this.createImg.style.transition='width 0.1s ease-in';
      	}
     }

      asideObject.image()

      if(asideObject.menuLink()!=undefined){
     	  if(element.isIntersecting){ 	
     		asideObject.AnimationFadeIn()
	         setTimeout(()=>{
				asideObject.imageStyle()
	         },100)
	      }else{
	      	asideObject.AnimationFadeOut()
        	if(asideObject.menuLink().querySelector('img')!=null){
        	asideObject.menuLink().removeChild(asideObject.menuLink().querySelector('img'))
          }
	    }
      }
    })
  }

  function sideFunction(elements){
     elements.forEach(element=>{
     	const sideObject = {
     		id:element.target.getAttribute('id'),
     		createImg: document.createElement('img'),
     		Link:function(){
     			return document.querySelector('aside ul li a[href*='+this.id+']')
     		},
     		Image:function(){
     			 this.createImg.src='icons/minus.png'
     		},
     		ImageStyle:function(){
     			this.createImg.style.width='30px';	
			 	this.createImg.style.transition='width 0.1s ease-in';
     		},
     		AnimationFadeIn:function(){
     			this.Link().classList.add('active-list')
     			this.Link().appendChild(this.createImg)	
     		},
     		AnimationFadeOut:function(){
     			this.Link().classList.remove('active-list')
     		}
     	}
     	sideObject.Image()
     	 if(element.isIntersecting){ 	
     			sideObject.AnimationFadeIn()
     		setTimeout(()=>{
     			sideObject.ImageStyle()
	         },100)
	      }else{
	      	 sideObject.AnimationFadeOut()
	      	if(sideObject.Link().querySelector('img')!=null){
        	sideObject.Link().removeChild(sideObject.Link().querySelector('img'))
          }
	     }
  	}) 
  }
function itemsFunction(items){
    items.forEach(item=>{
	let selected = item.target
	if(item.isIntersecting){
	   selected.classList.add('opacity-show')
	}else{
	   selected.classList.remove('opacity-show')
	}
   })
}
function frameworkFunction(framework){
	let frameworks = document.querySelectorAll('section article div#framework ul li')
	framework.addEventListener('click',event=>{	
		let items = document.querySelectorAll('div.framework-list div.items ol li')
		let text = event.target.textContent.toLowerCase()	
		items.forEach(item=>{
		let parent = item.parentElement.parentElement.parentElement
		if(text.includes(item.textContent.toLowerCase())){
			parent.classList.add(text)
		}else{
			if(text=='all'){
				parent.classList.add(text)
			}
		}
		if(parent.classList.contains(text)){
			parent.classList.remove('hide')
			setTimeout(()=>{
				parent.style.display='inline'
			},600)
			parent.classList.remove('all')
		}else if(parent.classList.contains('all')){
			parent.classList.remove('hide')
				setTimeout(()=>{
				parent.style.display='inline'
			},600)
		}else{
			parent.classList.add('hide')
			setTimeout(()=>{
				parent.style.display='none'
			},600)
		}
		})
		frameworks.forEach(hover=>{
		if(hover==event.target){
			hover.classList.add('hover-list')

		}else{
			hover.classList.remove('hover-list')
		}
	  })	
	})
}

function proceduralFunction(procedural){
	let procedurals = document.querySelectorAll('section article div#procedural ul li')
	procedural.addEventListener('click',event=>{	
		let items = document.querySelectorAll('div.procedural-list div.items ol li')
		let text = event.target.textContent.toLowerCase()	
		items.forEach(item=>{
		let parent = item.parentElement.parentElement.parentElement
		if(text.includes(item.textContent.toLowerCase())){
			parent.classList.add(text)
		}else{
			if(text=='all'){
				parent.classList.add(text)
			}
		}
		if(parent.classList.contains(text)){
			parent.classList.remove('hide')
			setTimeout(()=>{
				parent.style.display='inline'
			},600)
			parent.classList.remove('all')
		}else if(parent.classList.contains('all')){
			parent.classList.remove('hide')
				setTimeout(()=>{
				parent.style.display='inline'
			},600)
		}else{
			parent.classList.add('hide')
			setTimeout(()=>{
				parent.style.display='none'
			},600)
		}
		})
		procedurals.forEach(hover=>{
		if(hover==event.target){
			hover.classList.add('hover-list')

		}else{
			hover.classList.remove('hover-list')
		}
	  })	
	})
}
 function developmentFunction(developments){
  	developments.forEach(dev=>{
  		if(dev.isIntersecting){
  			dev.target.children[0].classList.add('development-left-animation')
  			dev.target.children[2].classList.add('development-right-animation')
  		}  
  	})
  }

function menuBurger(event){
	let menu = event.currentTarget
	let hamburger = document.querySelector('#hamburger')
	if(!menu.classList.contains('open')){
		 menu.classList.add('open');
		 hamburger.style.display='flex'
	}else{
		 menu.classList.remove('open');
		 hamburger.style.display='none'
	}
}
