document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form1")
    const p = document.getElementById("context")
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault()

            const email = document.getElementById("email").value 
            fetch('/odber-ajax/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value,
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: "email=" + encodeURIComponent(email)
            }).then(odpoved => odpoved.json()).then(idk => {
                p.textContent = idk.context
            })
        })
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.querySelector(".hamburger input[type='checkbox']");
    const navLinks = document.querySelectorAll(".links a");

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (checkbox) checkbox.checked = false;
      });
    });
  });

(function () {
  const nav = document.querySelector("nav");
  if (!nav) return;
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      nav.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.23)";
      nav.style.transition = "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out";
    } else {
      nav.style.boxShadow = "none";
    }
  });
})();

(function () {
  const el = document.getElementById("typewriter");
  if (!el) return;

  const text = "For your style and confidence";
  let index = 0;
  let deleting = false;
  const speed = 100;
  const pause = 1500;
  const pause2 = 1000

  el.textContent = "\u00A0";

  function animate() {
    if (!deleting) {
      el.textContent = text.slice(0, index + 1) || "\u00A0";
      index++;
      if (index === text.length) {
        deleting = true;
        setTimeout(animate, pause);
        return;
      }
    } else {
      el.textContent = text.slice(0, index - 1) || "\u00A0";
      index--;
      if (index === 0) {
        deleting = false;
        setTimeout(animate, pause2);
        return;
      }
    }
    setTimeout(animate, speed);
  }

  animate();
})();

function createCarousel({carouselSelector, photoSelector, nextBtnSelector, prevBtnSelector, dotsContainerSelector}) {
  const carousel = document.querySelector(carouselSelector);
  const photos = document.querySelectorAll(photoSelector);
  const nextBtn = document.querySelector(nextBtnSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const dotsContainer = document.querySelector(dotsContainerSelector);

  if (!carousel || photos.length === 0) return;

  let index = 0;

  photos.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => { 
      index = i; 
      update(); 
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  function update() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => { 
      index = (index + 1) % photos.length; 
      update(); 
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener("click", () => { 
      index = (index - 1 + photos.length) % photos.length; 
      update(); 
    });
  }

  update();
  setInterval(() => { 
    index = (index + 1) % photos.length; 
    update(); 
  }, 6000);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(".carousel-wrapper").forEach(wrapper => {
    const carousel = wrapper.querySelector("div");
    const nextBtn = wrapper.querySelector(".next");
    const prevBtn = wrapper.querySelector(".prev");
    const dotsContainer = wrapper.querySelector("div[class$='dots']");
    
    if (!carousel) return;
    
    const items = carousel.children;
    let index = 0;

    function updateCarousel() {
      Array.from(items).forEach((item, i) => {
        item.style.display = i === index ? "block" : "none";
      });
      
      if (dotsContainer) {
        dotsContainer.innerHTML = "";
        Array.from(items).forEach((_, i) => {
          const dot = document.createElement("span");
          dot.className = i === index ? "active" : "";
          dot.addEventListener("click", () => { 
            index = i; 
            updateCarousel(); 
          });
          dotsContainer.appendChild(dot);
        });
      }
    }

    nextBtn?.addEventListener("click", () => { 
      index = (index + 1) % items.length; 
      updateCarousel(); 
    });
    
    prevBtn?.addEventListener("click", () => { 
      index = (index - 1 + items.length) % items.length; 
      updateCarousel(); 
    });

    updateCarousel();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  const cartCounter = document.getElementById("cartCounter");
  const cartElement = document.getElementById("cart");
  const cartContainer = document.getElementById("cartContainer");
  const clearBtn = document.getElementById("clearCartBtn");
  const footer = document.querySelector("footer");
  const cart_icon = document.querySelector(".cartik")

  function updateCartCounter() {
    if (cartCounter) {
      const itemCount = cart.length;
      cartCounter.textContent = `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
    }
  }

  function animateCartIcon() {
    if (cart_icon) {
      cart_icon.classList.remove("houpat");
      void cart_icon.offsetWidth;
      cart_icon.classList.add("houpat")

      cart_icon.addEventListener("animationend", function handler() {
        cart_icon.classList.remove("houpat");
        cart_icon.removeEventListener("animationend", handler);
      });
    }
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function showFlyingNotification(productName, buttonElement) {
    const notification = document.createElement("div");
    notification.className = "fly_to_cart";
    notification.textContent = `+1 ${productName}`;
    notification.style.cssText = `
      position: fixed;
      z-index: 10000;
      background: #4CAF50;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      pointer-events: none;
      transition: all 0.8s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    const rect = buttonElement.getBoundingClientRect();
    notification.style.left = rect.left + "px";
    notification.style.top = rect.top + "px";

    setTimeout(() => {
      notification.style.transform = `translate(${window.innerWidth - rect.left - 200}px, -${rect.top + 50}px)`;
      notification.style.opacity = "0";
    }, 100);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 1000);
  }

  function handleCartVisibility() {
    if (!cartElement || !footer) return;
    
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const footerTop = footer.offsetTop;
    const scrollBottom = scrollY + vh;

    if (scrollY > vh * 0.5 && scrollBottom < footerTop - 40) {
      cartElement.style.display = "flex";
      cartElement.classList.add('visible');
    } else {
      cartElement.style.display = "none";
      cartElement.classList.remove('visible');

      if (cart_icon) {
        cart_icon.classList.remove("houpat");
      }
    }
  }

  window.addEventListener("scroll", handleCartVisibility);
  
  updateCartCounter();

  const addToCartSelectors = [
    '.accessories_others', 
    '.add_to_cart', 
    'form[data-cart-form]',
    'button[data-add-to-cart]'
  ];

  addToCartSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      const isForm = element.tagName.toLowerCase() === 'form';
      const isButton = element.tagName.toLowerCase() === 'button';
      
      if (isForm) {
        element.addEventListener("submit", handleAddToCart);
      } else if (isButton) {
        element.addEventListener("click", handleAddToCart);
      } else {
        const submitBtn = element.querySelector('button[type="submit"], input[type="submit"], .add_to_cart');
        if (submitBtn) {
          submitBtn.addEventListener("click", handleAddToCart);
        }
      }
    });
  });

  function handleAddToCart(e) {
    e.preventDefault();
    const form = e.target.closest('form') || e.target.closest('.accessories_others');

    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const productNameSelect = form.querySelector('select:first-of-type');
    const sizeSelect = form.querySelector('select:nth-of-type(2)');
    const priceElement = form.querySelector('h4, .price, [data-price]');

    
    const productName = productNameSelect?.value || '';
    const size = sizeSelect?.value || '';
    const price = priceElement ? priceElement.textContent.replace(/[^\d,.-]/g, '').trim() : '';

    const product = {
      id: Date.now() + Math.random(),
      productName,
      size,
      price: priceElement ? priceElement.textContent.replace(/[^\d,.-]/g, '').trim() : '',
      dateAdded: new Date().toISOString()
    };

    cart.push(product);
    saveCart();
    updateCartCounter();
    animateCartIcon(); 

    showFlyingNotification(productName, e.target);

    console.log('Product added to cart:', product);
  }

  const kosikItems = document.querySelector('.kosik_items');
  
  if (kosikItems) {
    function renderCart() {
      kosikItems.innerHTML = "";
      
      if (cart.length === 0) {
        kosikItems.innerHTML = `
          <div class="empty-cart">
            <p>Your cart is empty</p>
            <a href="/" class="continue-shopping">Continue shopping</a>
          </div>
        `;
        if (typeof renderPrehled === "function") {
          renderPrehled();
        }
        return;
      }
      const prices = {
        "Belt": {
          S: 799,
          M: 799,
          L: 799
        },
        "Summer'24 tee": {
          S: 599,
          M: 599,
          L: 599
        },
        "Greyhound Longsleeve": {
          S: 949,
          M: 949,
          L: 949
        },
        "Crewneck": {
          S: 1499,
          M: 1499,
          L: 1499
        }
      };

      let totalPrice = 0;

      const cartItemsHtml = cart.map((item, index) => {
        const itemPrice = prices[item.productName]?.[item.size] || 0;
        totalPrice += itemPrice;

        return `
          <div class="cart-item" data-index="${index}">
            <div class="item-info">
              <h3>${item.productName}</h3>
              <div class="item-details">
                ${[
                  `Size: ${item.size}`,
                  itemPrice ? `${itemPrice} Czk` : null
                ].filter(Boolean).join(' | ')}
              </div>
            </div>
            <div class="item-actions">
              <button class="remove-item" data-index="${index}">
                <img src="https://martinlopezramos.github.io/Trash 2.png" alt="remove" />
              </button>
            </div>
          </div>
        `;
      }).join('');

      kosikItems.innerHTML = `
        <div class="cart-content">
          <div class="cart-items-list">
            ${cartItemsHtml}
          </div>
          
          <div class="cart-summary">
            ${totalPrice > 0 ? `
              <div class="summary-row total">
                <span>Total price: </span>
                <span>&nbsp;${totalPrice} Czk</span>
              </div>
            ` : ''}
            
            <div class="cart-actions">
              <button class="clear-cart-btn">Empty cart</button>
            </div>
          </div>
        </div>
      `;

      if (typeof renderPrehled === "function") {
        renderPrehled();
      }

      document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", () => {
          const index = parseInt(btn.dataset.index);
          const removedItem = cart[index];
        
            cart.splice(index, 1);
            saveCart();
            updateCartCounter();
            renderCart();
            
            showRemoveNotification(removedItem.productName);
        });
      });

      const clearCartBtn = document.querySelector('.clear-cart-btn');
      if (clearCartBtn) {
        clearCartBtn.addEventListener("click", () => {
          cart = [];
          clear_everything()
          saveCart();
          updateCartCounter();
          renderCart();
        });
      }

      const checkoutBtn = document.querySelector('.checkout-btn');
      if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
          alert('The ordering feature will be available soon!');
        });
      }
    }

    function showRemoveNotification(productName) {
      const notification = document.createElement("div");
      notification.className = "remove_notification";
      notification.textContent = `${productName} was removed from your cart`;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: #f44336;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.transform = "translateX(0)";
      }, 100);
      
      setTimeout(() => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }, 2000);
    }

    function clear_everything() {
      const notification = document.createElement("div");
      notification.className = "remove_notification";
      notification.textContent = "The cart has been emptied";
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: #f44336;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.transform = "translateX(0)";
      }, 100);
      
      setTimeout(() => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }, 2000);
    }
    
    const prehledContainer = document.querySelector('.prehled');
    const freeStickersNotice = document.querySelector('.free-stickers-notice');

    if (prehledContainer) {
      function renderPrehled() {
        prehledContainer.innerHTML = "";

        if (cart.length === 0) {
          prehledContainer.innerHTML = `
            <div class="prehled-empty">
              <p>Your cart is empty</p>
            </div>
          `;
          // Hide free stickers notice when cart is empty
          if (freeStickersNotice) {
            freeStickersNotice.style.display = 'none';
          }
          return;
        }

        const prices = {
          "Belt": {
            S: 799,
            M: 799,
            L: 799
          },
          "Summer'24 tee": {
            S: 599,
            M: 599,
            L: 599
          },
          "Greyhound Longsleeve": {
            S: 949,
            M: 949,
            L: 949
          },
          "Crewneck": {
            S: 1499,
            M: 1499,
            L: 1499
          }
        };

        let totalPrice = 0;
        let prehledHtml = `<h4><u>Overview</u></h4><ul>`;

        cart.forEach(item => {
          const itemPrice = prices[item.productName]?.[item.size] || 0;
          totalPrice += itemPrice;

          prehledHtml += `
            <li>
              1x ${item.productName} (${item.size}) - ${itemPrice} Czk
            </li>
          `;
        });

        prehledHtml += `</ul>`;

        prehledHtml += `
          <div class="prehled-total">
            <strong>Total amount due: ${totalPrice} Czk</strong>
          </div>
        `;

        prehledContainer.innerHTML = prehledHtml;
        
        // Show free stickers notice when cart has items
        if (freeStickersNotice) {
          freeStickersNotice.style.display = 'block';
        }
      }

      renderPrehled();
    }

    renderCart();
  }

  window.cartDebug = {
    getCart: () => cart,
    clearCart: () => {
      cart = [];
      saveCart();
      updateCartCounter();
      if (cartContainer) renderCart();
    },
    addTestItem: () => {
      cart.push({
        id: Date.now(),
        productName: 'Test Product',
        size: 'M',
        variant: 'Red',
        price: '100 Czk'
      });
      saveCart();
      updateCartCounter();
      if (cartContainer) renderCart();
    }
  };
});

const popup = document.getElementById("popup");
const openBtn = document.getElementById("openPopup");
const closeBtn = document.getElementById("closePopup");

if (openBtn) {
  openBtn.onclick = () => {
    popup.style.display = "flex";
  };
}

if (closeBtn) {
  closeBtn.onclick = () => {
    popup.style.display = "none";
  };
}

window.onclick = (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
};

// document.addEventListener("DOMContentLoaded", function() {
//     const form = document.getElementById("form1")
//     const p = document.getElementById("context")
//     form.addEventListener("submit", function(e) {
//         e.preventDefault()

//         const email = document.getElementById("email").value 
//         fetch('/odber-ajax/', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value,
//                 "X-Requested-With": "XMLHttpRequest"
//             },
//             body: "email=" + encodeURIComponent(email)
//         }).then(odpoved => odpoved.json()).then(idk => {
//             p.textContent = idk.context
//         })
//     })
// })

// document.addEventListener("DOMContentLoaded", () => {
//     const checkbox = document.querySelector(".hamburger input[type='checkbox']");
//     const navLinks = document.querySelectorAll(".links a");

//     navLinks.forEach(link => {
//       link.addEventListener("click", () => {
//         checkbox.checked = false;
//       });
//     });
//   });

// (function () {
//   const nav = document.querySelector("nav");
//   if (!nav) return;
  
//   window.addEventListener("scroll", () => {
//     if (window.scrollY > 0) {
//       nav.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.23)";
//       nav.style.transition = "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out";
//     } else {
//       nav.style.boxShadow = "none";
//     }
//   });
// })();

// (function () {
//   const el = document.getElementById("typewriter");
//   if (!el) return;

//   const text = "For your style and confidence";
//   let index = 0;
//   let deleting = false;
//   const speed = 100;
//   const pause = 1500;
//   const pause2 = 1000

//   el.textContent = "\u00A0";

//   function animate() {
//     if (!deleting) {
//       el.textContent = text.slice(0, index + 1) || "\u00A0";
//       index++;
//       if (index === text.length) {
//         deleting = true;
//         setTimeout(animate, pause);
//         return;
//       }
//     } else {
//       el.textContent = text.slice(0, index - 1) || "\u00A0";
//       index--;
//       if (index === 0) {
//         deleting = false;
//         setTimeout(animate, pause2);
//         return;
//       }
//     }
//     setTimeout(animate, speed);
//   }

//   animate();
// })();

// function createCarousel({carouselSelector, photoSelector, nextBtnSelector, prevBtnSelector, dotsContainerSelector}) {
//   const carousel = document.querySelector(carouselSelector);
//   const photos = document.querySelectorAll(photoSelector);
//   const nextBtn = document.querySelector(nextBtnSelector);
//   const prevBtn = document.querySelector(prevBtnSelector);
//   const dotsContainer = document.querySelector(dotsContainerSelector);

//   if (!carousel || photos.length === 0) return;

//   let index = 0;

//   photos.forEach((_, i) => {
//     const dot = document.createElement("span");
//     dot.addEventListener("click", () => { 
//       index = i; 
//       update(); 
//     });
//     dotsContainer.appendChild(dot);
//   });

//   const dots = dotsContainer.querySelectorAll("span");

//   function update() {
//     carousel.style.transform = `translateX(-${index * 100}%)`;
//     dots.forEach(dot => dot.classList.remove("active"));
//     if (dots[index]) dots[index].classList.add("active");
//   }

//   if (nextBtn) {
//     nextBtn.addEventListener("click", () => { 
//       index = (index + 1) % photos.length; 
//       update(); 
//     });
//   }
  
//   if (prevBtn) {
//     prevBtn.addEventListener("click", () => { 
//       index = (index - 1 + photos.length) % photos.length; 
//       update(); 
//     });
//   }

//   update();
//   setInterval(() => { 
//     index = (index + 1) % photos.length; 
//     update(); 
//   }, 6000);
// }

// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll(".carousel-wrapper").forEach(wrapper => {
//     const carousel = wrapper.querySelector("div");
//     const nextBtn = wrapper.querySelector(".next");
//     const prevBtn = wrapper.querySelector(".prev");
//     const dotsContainer = wrapper.querySelector("div[class$='dots']");
    
//     if (!carousel) return;
    
//     const items = carousel.children;
//     let index = 0;

//     function updateCarousel() {
//       Array.from(items).forEach((item, i) => {
//         item.style.display = i === index ? "block" : "none";
//       });
      
//       if (dotsContainer) {
//         dotsContainer.innerHTML = "";
//         Array.from(items).forEach((_, i) => {
//           const dot = document.createElement("span");
//           dot.className = i === index ? "active" : "";
//           dot.addEventListener("click", () => { 
//             index = i; 
//             updateCarousel(); 
//           });
//           dotsContainer.appendChild(dot);
//         });
//       }
//     }

//     nextBtn?.addEventListener("click", () => { 
//       index = (index + 1) % items.length; 
//       updateCarousel(); 
//     });
    
//     prevBtn?.addEventListener("click", () => { 
//       index = (index - 1 + items.length) % items.length; 
//       updateCarousel(); 
//     });

//     updateCarousel();
//   });
// });

// document.addEventListener('DOMContentLoaded', () => {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
//   const cartCounter = document.getElementById("cartCounter");
//   const cartElement = document.getElementById("cart");
//   const cartContainer = document.getElementById("cartContainer");
//   const clearBtn = document.getElementById("clearCartBtn");
//   const footer = document.querySelector("footer");
//   const cart_icon = document.querySelector(".cartik")

//   function updateCartCounter() {
//     if (cartCounter) {
//       const itemCount = cart.length;
//       cartCounter.textContent = `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
//     }
//   }

//   function animateCartIcon() {
//     if (cart_icon) {
//       cart_icon.classList.remove("houpat");
//       void cart_icon.offsetWidth;
//       cart_icon.classList.add("houpat")

//       cart_icon.addEventListener("animationend", function handler() {
//         cart_icon.classList.remove("houpat");
//         cart_icon.removeEventListener("animationend", handler);
//       });
//     }
//   }

//   function saveCart() {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }

//   function showFlyingNotification(productName, buttonElement) {
//     const notification = document.createElement("div");
//     notification.className = "fly_to_cart";
//     notification.textContent = `+1 ${productName}`;
//     notification.style.cssText = `
//       position: fixed;
//       z-index: 10000;
//       background: #4CAF50;
//       color: white;
//       padding: 8px 16px;
//       border-radius: 4px;
//       font-size: 14px;
//       pointer-events: none;
//       transition: all 0.8s ease-out;
//     `;
    
//     document.body.appendChild(notification);
    
//     const rect = buttonElement.getBoundingClientRect();
//     notification.style.left = rect.left + "px";
//     notification.style.top = rect.top + "px";

//     setTimeout(() => {
//       notification.style.transform = `translate(${window.innerWidth - rect.left - 200}px, -${rect.top + 50}px)`;
//       notification.style.opacity = "0";
//     }, 100);
    
//     setTimeout(() => {
//       if (notification.parentNode) {
//         notification.remove();
//       }
//     }, 1000);
//   }

//   function handleCartVisibility() {
//     if (!cartElement || !footer) return;
    
//     const scrollY = window.scrollY;
//     const vh = window.innerHeight;
//     const footerTop = footer.offsetTop;
//     const scrollBottom = scrollY + vh;

//     if (scrollY > vh * 0.5 && scrollBottom < footerTop - 40) {
//       cartElement.style.display = "flex";
//       cartElement.classList.add('visible');
//     } else {
//       cartElement.style.display = "none";
//       cartElement.classList.remove('visible');

//       if (cart_icon) {
//         cart_icon.classList.remove("houpat");
//       }
//     }
//   }

//   window.addEventListener("scroll", handleCartVisibility);
  
//   updateCartCounter();

//   const addToCartSelectors = [
//     '.accessories_others', 
//     '.add_to_cart', 
//     'form[data-cart-form]',
//     'button[data-add-to-cart]'
//   ];

//   addToCartSelectors.forEach(selector => {
//     document.querySelectorAll(selector).forEach(element => {
//       const isForm = element.tagName.toLowerCase() === 'form';
//       const isButton = element.tagName.toLowerCase() === 'button';
      
//       if (isForm) {
//         element.addEventListener("submit", handleAddToCart);
//       } else if (isButton) {
//         element.addEventListener("click", handleAddToCart);
//       } else {
//         const submitBtn = element.querySelector('button[type="submit"], input[type="submit"], .add_to_cart');
//         if (submitBtn) {
//           submitBtn.addEventListener("click", handleAddToCart);
//         }
//       }
//     });
//   });

//   function handleAddToCart(e) {
//     e.preventDefault();
//     const form = e.target.closest('form') || e.target.closest('.accessories_others');

//     if (form && !form.checkValidity()) {
//       form.reportValidity();
//       return;
//     }

//     const productNameSelect = form.querySelector('select:first-of-type');
//     const sizeSelect = form.querySelector('select:nth-of-type(2)');
//     const priceElement = form.querySelector('h4, .price, [data-price]');

    
//     const productName = productNameSelect?.value || '';
//     const size = sizeSelect?.value || '';
//     const price = priceElement ? priceElement.textContent.replace(/[^\d,.-]/g, '').trim() : '';

//     const product = {
//       id: Date.now() + Math.random(),
//       productName,
//       size,
//       price: priceElement ? priceElement.textContent.replace(/[^\d,.-]/g, '').trim() : '',
//       dateAdded: new Date().toISOString()
//     };

//     cart.push(product);
//     saveCart();
//     updateCartCounter();
//     animateCartIcon(); 

//     showFlyingNotification(productName, e.target);

//     console.log('Product added to cart:', product);
//   }

//   const kosikItems = document.querySelector('.kosik_items');
  
//   if (kosikItems) {
//     function renderCart() {
//       kosikItems.innerHTML = "";
      
//       if (cart.length === 0) {
//         kosikItems.innerHTML = `
//           <div class="empty-cart">
//             <p>Your cart is empty</p>
//             <a href="/" class="continue-shopping">Continue shopping</a>
//           </div>
//         `;
//         if (typeof renderPrehled === "function") {
//           renderPrehled();
//         }
//         return;
//       }
//       const prices = {
//         "Belt": {
//           S: 799,
//           M: 799,
//           L: 799
//         },
//         "Summer’24 tee": {
//           S: 599,
//           M: 599,
//           L: 599
//         },
//         "Greyhound Longsleeve": {
//           S: 949,
//           M: 949,
//           L: 949
//         },
//         "Crewneck": {
//           S: 1499,
//           M: 1499,
//           L: 1499
//         }
//       };

//       let totalPrice = 0;

//       const cartItemsHtml = cart.map((item, index) => {
//         const itemPrice = prices[item.productName]?.[item.size] || 0;
//         totalPrice += itemPrice;

//         return `
//           <div class="cart-item" data-index="${index}">
//             <div class="item-info">
//               <h3>${item.productName}</h3>
//               <div class="item-details">
//                 ${[
//                   `Size: ${item.size}`,
//                   itemPrice ? `${itemPrice} Czk` : null
//                 ].filter(Boolean).join(' | ')}
//               </div>
//             </div>
//             <div class="item-actions">
//               <button class="remove-item" data-index="${index}">
//                 <img src="https://martinlopezramos.github.io/Trash 2.png" alt="remove" />
//               </button>
//             </div>
//           </div>
//         `;
//       }).join('');

//       kosikItems.innerHTML = `
//         <div class="cart-content">
//           <div class="cart-items-list">
//             ${cartItemsHtml}
//           </div>
          
//           <div class="cart-summary">
//             ${totalPrice > 0 ? `
//               <div class="summary-row total">
//                 <span>Total price: </span>
//                 <span>&nbsp;${totalPrice} Czk</span>
//               </div>
//             ` : ''}
            
//             <div class="cart-actions">
//               <button class="clear-cart-btn">Empty cart</button>
//             </div>
//           </div>
//         </div>
//       `;

//       if (typeof renderPrehled === "function") {
//         renderPrehled();
//       }

//       document.querySelectorAll(".remove-item").forEach(btn => {
//         btn.addEventListener("click", () => {
//           const index = parseInt(btn.dataset.index);
//           const removedItem = cart[index];
        
//             cart.splice(index, 1);
//             saveCart();
//             updateCartCounter();
//             renderCart();
            
//             showRemoveNotification(removedItem.productName);
//         });
//       });

//       const clearCartBtn = document.querySelector('.clear-cart-btn');
//       if (clearCartBtn) {
//         clearCartBtn.addEventListener("click", () => {
//           cart = [];
//           clear_everything()
//           saveCart();
//           updateCartCounter();
//           renderCart();
//         });
//       }

//       const checkoutBtn = document.querySelector('.checkout-btn');
//       if (checkoutBtn) {
//         checkoutBtn.addEventListener("click", () => {
//           alert('The ordering feature will be available soon!');
//         });
//       }
//     }

//     function showRemoveNotification(productName) {
//       const notification = document.createElement("div");
//       notification.className = "remove_notification";
//       notification.textContent = `${productName} was removed from your cart`;
//       notification.style.cssText = `
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         z-index: 10000;
//         background: #f44336;
//         color: white;
//         padding: 12px 20px;
//         border-radius: 4px;
//         font-size: 14px;
//         box-shadow: 0 2px 10px rgba(0,0,0,0.3);
//         transform: translateX(100%);
//         transition: transform 0.3s ease-out;
//       `;
      
//       document.body.appendChild(notification);
      
//       setTimeout(() => {
//         notification.style.transform = "translateX(0)";
//       }, 100);
      
//       setTimeout(() => {
//         notification.style.transform = "translateX(100%)";
//         setTimeout(() => {
//           if (notification.parentNode) {
//             notification.remove();
//           }
//         }, 300);
//       }, 2000);
//     }

//     function clear_everything() {
//       const notification = document.createElement("div");
//       notification.className = "remove_notification";
//       notification.textContent = "The cart has been emptied";
//       notification.style.cssText = `
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         z-index: 10000;
//         background: #f44336;
//         color: white;
//         padding: 12px 20px;
//         border-radius: 4px;
//         font-size: 14px;
//         box-shadow: 0 2px 10px rgba(0,0,0,0.3);
//         transform: translateX(100%);
//         transition: transform 0.3s ease-out;
//       `;
      
//       document.body.appendChild(notification);
      
//       setTimeout(() => {
//         notification.style.transform = "translateX(0)";
//       }, 100);
      
//       setTimeout(() => {
//         notification.style.transform = "translateX(100%)";
//         setTimeout(() => {
//           if (notification.parentNode) {
//             notification.remove();
//           }
//         }, 300);
//       }, 2000);
//     }
//     const prehledContainer = document.querySelector('.prehled');

//     if (prehledContainer) {
//       function renderPrehled() {
//         prehledContainer.innerHTML = "";

//         if (cart.length === 0) {
//           prehledContainer.innerHTML = `
//             <div class="prehled-empty">
//               <p>Your cart is empty</p>
//             </div>
//           `;
//           return;
//         }

//         const prices = {
//           "Belt": {
//             S: 799,
//             M: 799,
//             L: 799
//           },
//           "Summer’24 tee": {
//             S: 599,
//             M: 599,
//             L: 599
//           },
//           "Greyhound Longsleeve": {
//             S: 949,
//             M: 949,
//             L: 949
//           },
//           "Crewneck": {
//             S: 1499,
//             M: 1499,
//             L: 1499
//           }
//         };

//         let totalPrice = 0;
//         let prehledHtml = `<h4><u>Overview</u></h4><ul>`;

//         cart.forEach(item => {
//           const itemPrice = prices[item.productName]?.[item.size] || 0;
//           totalPrice += itemPrice;

//           prehledHtml += `
//             <li>
//               1x ${item.productName} (${item.size}) - ${itemPrice} Czk
//             </li>
//           `;
//         });

//         prehledHtml += `</ul>`;

//         prehledHtml += `
//           <div class="prehled-total">
//             <strong>Total amount due: ${totalPrice} Czk</strong>
//           </div>
//         `;

//         prehledContainer.innerHTML = prehledHtml;
//       }

//       renderPrehled();
//     }

//     renderCart();
//   }

//   window.cartDebug = {
//     getCart: () => cart,
//     clearCart: () => {
//       cart = [];
//       saveCart();
//       updateCartCounter();
//       if (cartContainer) renderCart();
//     },
//     addTestItem: () => {
//       cart.push({
//         id: Date.now(),
//         productName: 'Test Product',
//         size: 'M',
//         variant: 'Red',
//         price: '100 Czk'
//       });
//       saveCart();
//       updateCartCounter();
//       if (cartContainer) renderCart();
//     }
//   };
// });

// const popup = document.getElementById("popup");
// const openBtn = document.getElementById("openPopup");
// const closeBtn = document.getElementById("closePopup");

// openBtn.onclick = () => {
//   popup.style.display = "flex";
// };

// closeBtn.onclick = () => {
//   popup.style.display = "none";
// };

// window.onclick = (e) => {
//   if (e.target === popup) {
//     popup.style.display = "none";
//   }
// };