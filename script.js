 // ინფო

  const IMAGES = [
    {
      full: 'images/image-product-1.jpg',
      thumb: 'images/image-product-1-thumbnail.jpg',
    },
    {
      full: 'images/image-product-2.jpg',
      thumb: 'images/image-product-2-thumbnail.jpg',
    },
    {
      full: 'images/image-product-3.jpg',
      thumb: 'images/image-product-3-thumbnail.jpg',
    },
    {
      full: 'images/image-product-4.jpg',
      thumb: 'images/image-product-4-thumbnail.jpg',
    },
  ];

  const PRODUCT = {
    name: 'Fall Limited Edition Sneakers',
    price: 125.00,
    thumbSrc: IMAGES[0].thumb,
  };

  // საწყისები
  
  let quantity = 0;          
  let cart = [];         
  let currentSlide = 0;       
  let desktopIndex = 0;       

 
  // ელემენტები
  
  const overlay        = document.getElementById('overlay');
  const burgerBtn      = document.getElementById('burgerBtn');
  const mobileNav      = document.getElementById('mobileNav');
  const closeNav       = document.getElementById('closeNav');
  const cartBtn        = document.getElementById('cartBtn');
  const cartDropdown   = document.getElementById('cartDropdown');
  const cartCountEl    = document.getElementById('cartCount');
  const cartBody       = document.getElementById('cartBody');
  const qtyMinus       = document.getElementById('qtyMinus');
  const qtyPlus        = document.getElementById('qtyPlus');
  const qtyValueEl     = document.getElementById('qtyValue');
  const addToCartBtn   = document.getElementById('addToCartBtn');
  const mobilePrev     = document.getElementById('mobilePrev');
  const mobileNext     = document.getElementById('mobileNext');
  const mobileTrack    = document.getElementById('mobileTrack');
  const desktopMainImg = document.getElementById('desktopMainImg');
  const desktopMainImgEl = document.getElementById('desktopMainImgEl');
  const desktopThumbs  = document.querySelectorAll('.thumb');
  const lightbox       = document.getElementById('lightbox');
  const lightboxClose  = document.getElementById('lightboxClose');
  const lightboxImg    = document.getElementById('lightboxImg');
  const lightboxPrev   = document.getElementById('lightboxPrev');
  const lightboxNext   = document.getElementById('lightboxNext');
  const lightboxThumbs = document.getElementById('lightboxThumbs');


  // მობილური ნავიგაციის ღილაკი

  burgerBtn.addEventListener('click', () => {
    mobileNav.classList.add('open');
    overlay.classList.add('active');
  });

  closeNav.addEventListener('click', closeMobileNav);
  overlay.addEventListener('click', () => {
    closeMobileNav();
    closeCart();
  });

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    
    if (!cartDropdown.classList.contains('open')) {
      overlay.classList.remove('active');
    }
  }

  // კალათა

  cartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cartDropdown.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!cartDropdown.contains(e.target) && e.target !== cartBtn) {
      closeCart();
    }
  });

  function closeCart() {
    cartDropdown.classList.remove('open');
  }

  
  // რაოდენობა
  
  qtyMinus.addEventListener('click', () => {
    if (quantity > 0) {
      quantity--;
      qtyValueEl.textContent = quantity;
    }
  });

  qtyPlus.addEventListener('click', () => {
    quantity++;
    qtyValueEl.textContent = quantity;
  });

  
  // კალათაში დამატება

  addToCartBtn.addEventListener('click', () => {
    if (quantity === 0) return;

    // თუ პროდუქტი უკვე კალათაშია, განახლება რაოდენობისთვის
    const existing = cart.find(i => i.name === PRODUCT.name);
    if (existing) {
      existing.qty += quantity;
    } else {
      cart.push({ ...PRODUCT, qty: quantity });
    }

    quantity = 0;
    qtyValueEl.textContent = 0;

    cartUpdate();
  });

  function cartUpdate() {
    // განახლება კალათის რაოდენობის ინდიკატორისთვის
    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);

    if (totalQty > 0) {
      cartCountEl.textContent = totalQty;
      cartCountEl.classList.add('visible');
    } else {
      cartCountEl.classList.remove('visible');
    }

    // განახლება კალათის შიგთავსისთვის
    if (cart.length === 0) {
      cartBody.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      return;
    }

    let html = '<div class="cart-items">';
    cart.forEach((item, idx) => {
      const total = (item.price * item.qty).toFixed(2);
      html += `
        <div class="cart-item">
          <img src="${item.thumbSrc}"
               onerror="this.src='https://via.placeholder.com/50x50/FF7D1A/ffffff?text=S'"
               alt="${item.name}"/>
          <div class="cart-item-info">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">
              $${item.price.toFixed(2)} x ${item.qty}
              <strong>$${total}</strong>
            </p>
          </div>
          <button class="cart-item-remove" data-idx="${idx}" aria-label="Remove item">
            <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375zM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7zm2.5 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7zm2.5 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7z" fill-rule="nonzero"/>
            </svg>
          </button>
        </div>
      `;
    });
    html += '</div>';
    html += '<button class="btn-checkout">Checkout</button>';
    cartBody.innerHTML = html;

    // წაშლა
    cartBody.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        cart.splice(idx, 1);
        cartUpdate();
      });
    });
  }

  
  // მობილური გალერეა
  
  function slideChange(index) {
    currentSlide = (index + IMAGES.length) % IMAGES.length;
    mobileTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  mobilePrev.addEventListener('click', () => slideChange(currentSlide - 1));
  mobileNext.addEventListener('click', () => slideChange(currentSlide + 1));

 
  // დექსტოპის გალერეა

  desktopThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.dataset.index);
      setDesktopImage(idx);
    });
  });

  function setDesktopImage(idx) {
    desktopIndex = idx;
    desktopMainImgEl.src = IMAGES[idx].full;
    desktopThumbs.forEach((t, i) => {
      t.classList.toggle('active', i === idx);
    });
  }

  
  // მხოლოდ დექსტოპზე ლაითბოქს მოდელი

  desktopMainImg.addEventListener('click', () => {
    // მხოლოდ დექსტოპიზე გავხსნათ ლაითბოქსი
    if (window.innerWidth < 768) return;
    openLightbox(desktopIndex);
  });

  function openLightbox(idx) {
    desktopIndex = idx;
    lightbox.classList.add('open');
    updateLightbox();
    
    if (lightboxThumbs.children.length === 0) {
      IMAGES.forEach((img, i) => {
        const div = document.createElement('div');
        div.className = 'lightbox-thumb' + (i === 0 ? ' active' : '');
        div.innerHTML = `<img src="${img.thumb}" alt="Thumb ${i+1}"/>`;
        div.addEventListener('click', () => {
          desktopIndex = i;
          updateLightbox();
        });
        lightboxThumbs.appendChild(div);
      });
    }
  }

  function updateLightbox() {
    lightboxImg.src = IMAGES[desktopIndex].full;
    // სინქრონიზაცია ლაითბოქსის თამბნეილების აქტივობისთვის
    lightboxThumbs.querySelectorAll('.lightbox-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === desktopIndex);
    });
    // სინქრონიზაცია დექსტოპის მთავარ სურათთან
    setDesktopImage(desktopIndex);
  }

  lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });

  lightboxPrev.addEventListener('click', () => {
    desktopIndex = (desktopIndex - 1 + IMAGES.length) % IMAGES.length;
    updateLightbox();
  });
  lightboxNext.addEventListener('click', () => {
    desktopIndex = (desktopIndex + 1) % IMAGES.length;
    updateLightbox();
  });

  
  // კლავიატურის ნავიგაცია ლაითბოქსში
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('open');
      closeMobileNav();
      closeCart();
    }
    if (lightbox.classList.contains('open')) {
      if (e.key === 'ArrowLeft') {
        desktopIndex = (desktopIndex - 1 + IMAGES.length) % IMAGES.length;
        updateLightbox();
      }
      if (e.key === 'ArrowRight') {
        desktopIndex = (desktopIndex + 1) % IMAGES.length;
        updateLightbox();
      }
    }
  });