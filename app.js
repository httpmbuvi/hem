const { createApp, ref, computed, reactive, watch, nextTick, onMounted } = Vue;

createApp({
    setup() {
        // --- STATE ---
        const currentPage = ref('home');
        const mobileMenuOpen = ref(false);
        const isAdmin = ref(false);
        const isDarkMode = ref(true);
        const currency = ref('USD');
        const searchQuery = ref('');
        const selectedPost = ref(null);
        const showSizeGuide = ref(false);
        const showBackToTop = ref(false);

        // Scroll Reveal Observer
        const initObserver = () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        };

        watch(currentPage, () => {
            nextTick(() => initObserver());
        });
        onMounted(() => initObserver());

        // Scroll Listener
        window.addEventListener('scroll', () => {
            showBackToTop.value = window.scrollY > 500;
        });
        const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Word Cycle
        const words = ['SPEED', 'PACE', 'RHYTHM', 'FLOW'];
        const currentWordIndex = ref(0);
        const currentWord = computed(() => words[currentWordIndex.value]);
        
        setInterval(() => currentWordIndex.value = (currentWordIndex.value + 1) % words.length, 2500);
        
        // Countdown Logic
        const countdown = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        // Set drop date to 3 days from now for demo purposes
        const dropDate = new Date();
        dropDate.setDate(dropDate.getDate() + 3); 

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = dropDate.getTime() - now;
            if (distance > 0) {
                countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
                countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000);
            }
        };
        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Hero Slideshow
        const heroImages = [
            { url: 'https://i.pinimg.com/736x/dd/de/14/ddde149b1134c4387cd174a99b8d2e31.jpg', title: 'URBAN' },
            { url: 'https://i.pinimg.com/736x/3a/97/d2/3a97d26f64048e950eb2668b9f616a37.jpg', title: 'STREET' },
            { url: 'https://i.pinimg.com/736x/31/32/5b/31325b853afe85d607784c17d14249fd.jpg', title: 'NIGHT' },
            { url: 'https://i.pinimg.com/1200x/97/53/4b/97534b76c1d8417d2e4226a22c7fbff9.jpg', title: 'SPEED' },
            { url: 'https://i.pinimg.com/1200x/8d/07/3e/8d073e02519a5cb852fcff89deef7c08.jpg', title: 'PACE' },
            { url: 'https://i.pinimg.com/1200x/10/e3/eb/10e3eb549b9e6b0559ddab11342ffc0f.jpg', title: 'FLOW' }
        ];
        const currentHeroIndex = ref(0);
        
        setInterval(() => {
            currentHeroIndex.value = (currentHeroIndex.value + 1) % heroImages.length;
        }, 5000);
        
        // Mock Data
        const categories = ['Hoodies', 'T-Shirts', 'Pants', 'Accessories'];
        
        const defaultProducts = [
            { 
                id: 1, 
                name: 'Cyber Hoodie V1', 
                price: 89, 
                category: 'Hoodies', 
                sizes: ['M', 'L', 'XL'], 
                colors: ['Black', 'Charcoal'], 
                stock: 15, 
                material: 'Cotton',
                image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop',
                isLatest: true
            },
            { 
                id: 2, 
                name: 'Neon Runner Tee', 
                price: 45, 
                category: 'T-Shirts', 
                sizes: ['S', 'M', 'L'], 
                colors: ['White', 'Black', 'Neon'], 
                stock: 40, 
                material: 'Cotton',
                image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop',
                isLatest: true
            },
            { 
                id: 3, 
                name: 'Tactical Cargo', 
                price: 120, 
                category: 'Pants', 
                sizes: ['30', '32', '34'], 
                colors: ['Olive', 'Black'], 
                stock: 8, 
                material: 'Linen',
                image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=1974&auto=format&fit=crop',
                isLatest: true
            },
            { 
                id: 4, 
                name: 'Street Cap', 
                price: 35, 
                category: 'Accessories', 
                sizes: ['One Size'], 
                colors: ['Black'], 
                stock: 25, 
                material: 'Cotton',
                image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1936&auto=format&fit=crop',
                isLatest: false
            },
            { 
                id: 5, 
                name: 'Oversized Puffer', 
                price: 180, 
                category: 'Hoodies', 
                sizes: ['L', 'XL'], 
                colors: ['Silver'], 
                stock: 3, 
                material: 'Polyester',
                image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop',
                isLatest: false
            }
        ];

        // Initialize products from localStorage or default
        const storedProducts = localStorage.getItem('hem_products');
        const products = ref(storedProducts ? JSON.parse(storedProducts) : defaultProducts);

        // Save to localStorage whenever products change
        watch(products, (newVal) => {
            localStorage.setItem('hem_products', JSON.stringify(newVal));
        }, { deep: true });

        const blogPosts = ref([
            {
                id: 1,
                title: 'THE RISE OF TECHWEAR',
                date: 'OCT 12, 2024',
                category: 'CULTURE',
                image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
                excerpt: 'Techwear is more than just pockets and straps. It is the intersection of utility and aesthetics in the modern urban environment.',
                content: `Techwear has evolved from a niche subculture into a dominant force in modern fashion. Originating from the need for functional clothing that could withstand the elements of urban life, it has transformed into a statement of identity.
                
                At its core, techwear is about utility. Waterproof fabrics, articulated joints for movement, and ample storage are staples. But beyond functionality, it represents a futuristic outlook—a preparation for a cyberpunk reality that feels increasingly close.
                
                HEM embraces this philosophy. Our latest collection integrates technical fabrics with street-ready silhouettes, ensuring you stay dry and look sharp, whether you're navigating the subway or the runway.`
            },
            {
                id: 2,
                title: 'MINIMALISM IN CHAOS',
                date: 'SEP 28, 2024',
                category: 'DESIGN',
                image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop',
                excerpt: 'In a world of noise, silence is loud. Discover why minimalist streetwear is taking over the global fashion scene.',
                content: `The streets are loud. Advertisements, traffic, crowds—it's a sensory overload. Minimalist streetwear offers a counter-narrative. It strips away the unnecessary, focusing on form, fit, and fabric.
                
                By reducing the noise in your outfit, you amplify your presence. A simple black hoodie with the perfect drop shoulder speaks volumes more than a neon billboard. It says you are confident enough to let the details do the talking.
                
                This season, we explore the power of negative space. Monochromatic palettes, subtle branding, and architectural cuts define the new HEM aesthetic.`
            },
            {
                id: 3,
                title: 'SNEAKER CULTURE 2024',
                date: 'AUG 15, 2024',
                category: 'TRENDS',
                image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop',
                excerpt: 'From chunky dads shoes to sleek runners, we break down what is on foot this year and what is staying in the box.',
                content: `Sneaker culture is in a state of flux. The hype cycle is faster than ever, but timeless silhouettes are making a comeback. The "dad shoe" trend has matured into a appreciation for archival runners and retro basketball styles.
                
                Comfort is king in 2024. We are seeing a shift towards breathable mesh, advanced cushioning, and versatile colorways that bridge the gap between performance and lifestyle.
                
                Pairing the right kicks with HEM cargo pants is an art form. It's about balance—weight at the bottom to anchor the oversized fits up top.`
            }
        ]);

        // Shop Logic
        const filterCategory = ref('');
        const maxPrice = ref(500);
        
        const filteredProducts = computed(() => {
            return products.value.filter(p => {
                const matchCat = filterCategory.value === '' || p.category === filterCategory.value;
                const matchPrice = p.price <= maxPrice.value;
                const matchSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase());
                return matchCat && matchPrice && matchSearch;
            });
        });

        const relatedProducts = computed(() => {
            if (!selectedProduct.value) return [];
            return products.value
                .filter(p => p.id !== selectedProduct.value.id)
                .slice(0, 3);
        });

        // Product Details Logic
        const selectedProduct = ref(null);
        const detailSize = ref('');
        const detailColor = ref('');

        // Cart Logic
        const cart = ref([]);
        const cartCount = computed(() => cart.value.reduce((acc, item) => acc + item.quantity, 0));
        const cartTotal = computed(() => cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0));

        // Wishlist Logic
        const wishlist = ref([]);
        const toggleWishlist = (product) => {
            const index = wishlist.value.findIndex(p => p.id === product.id);
            if (index === -1) {
                wishlist.value.push(product);
            } else {
                wishlist.value.splice(index, 1);
            }
        };
        const isInWishlist = (product) => {
            return wishlist.value.some(p => p.id === product.id);
        };

        // Admin Form Logic
        const isEditing = ref(false);
        const productForm = reactive({
            id: null,
            name: '',
            price: 0,
            category: 'Hoodies',
            stock: 0,
            image: '',
            sizes: [], 
            colors: [],
            sizesInput: 'S, M, L, XL',
            colorsInput: 'Black, White',
            material: 'Cotton',
            isLatest: false
        });

        // Activity Log Logic
        const storedLog = localStorage.getItem('hem_activity_log');
        const activityLog = ref(storedLog ? JSON.parse(storedLog) : []);

        watch(activityLog, (newVal) => {
            localStorage.setItem('hem_activity_log', JSON.stringify(newVal));
        }, { deep: true });

        const logActivity = (action, details) => {
            activityLog.value.unshift({
                timestamp: new Date().toLocaleString(),
                action,
                details
            });
            if (activityLog.value.length > 50) activityLog.value.pop(); // Keep last 50
        };

        // --- METHODS ---

        const navigate = (page) => {
            currentPage.value = page;
            window.scrollTo(0,0);
        };

        const handleSearch = () => {
            if (searchQuery.value.length > 0 && currentPage.value !== 'shop') {
                navigate('shop');
            }
        };

        const toggleTheme = () => isDarkMode.value = !isDarkMode.value;
        
        const toggleCurrency = () => currency.value = currency.value === 'USD' ? 'KES' : 'USD';
        
        const formatPrice = (price) => {
            if (currency.value === 'KES') return `KES ${(price * 130).toLocaleString()}`;
            return `$${price}`;
        };

        const viewProduct = (product) => {
            selectedProduct.value = product;
            detailSize.value = product.sizes[0];
            detailColor.value = product.colors[0];
            navigate('product-details');
        };

        const viewPost = (post) => {
            selectedPost.value = post;
            navigate('blog-details');
        };

        const addToCart = (product, size, color) => {
            const selectedColor = color || product.colors[0];
            const existing = cart.value.find(item => item.id === product.id && item.size === size && item.color === selectedColor);
            if (existing) {
                existing.quantity++;
            } else {
                cart.value.push({
                    ...product,
                    size: size,
                    color: selectedColor,
                    quantity: 1
                });
            }
            // Simple feedback
            alert('ADDED TO CART');
        };

        const quickAdd = (product) => {
            addToCart(product, product.sizes[0], product.colors[0]);
        };

        const removeFromCart = (index) => {
            cart.value.splice(index, 1);
        };

        const updateQuantity = (index, change) => {
            const item = cart.value[index];
            const newVal = item.quantity + change;
            if (newVal > 0) {
                item.quantity = newVal;
            }
        };

        const processCheckout = () => {
            alert('Thank you for your order! HEM is processing your gear.');
            cart.value = [];
            navigate('home');
        };

        // Admin Methods
        const toggleAdmin = () => {
            if (isAdmin.value) {
                navigate('admin');
            } else {
                const pass = prompt("Enter Admin Password");
                if (pass === 'G-pace2026') {
                    isAdmin.value = true;
                    navigate('admin');
                } else {
                    alert('Access Denied');
                }
            }
        };

        const logoutAdmin = () => {
            isAdmin.value = false;
            navigate('home');
        };

        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    productForm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };

        const saveProduct = () => {
            if (!isAdmin.value) return alert("Only admin can save products.");
            
            const action = isEditing.value ? 'save changes to this product' : 'add this new product';
            if (!confirm(`Are you sure you want to ${action}?`)) return;

            // Process inputs
            productForm.sizes = productForm.sizesInput.split(',').map(s => s.trim()).filter(s => s);
            productForm.colors = productForm.colorsInput.split(',').map(s => s.trim()).filter(s => s);

            if (isEditing.value) {
                // Update
                const index = products.value.findIndex(p => p.id === productForm.id);
                if (index !== -1) {
                    products.value[index] = { ...productForm };
                    logActivity('UPDATE', `Updated product: ${productForm.name}`);
                }
            } else {
                // Create
                const newId = products.value.length > 0 ? Math.max(...products.value.map(p => p.id)) + 1 : 1;
                products.value.push({
                    ...productForm,
                    id: newId
                });
                logActivity('CREATE', `Added new product: ${productForm.name}`);
            }
            resetForm();
        };

        const editProduct = (product) => {
            Object.assign(productForm, product);
            productForm.sizesInput = product.sizes.join(', ');
            productForm.colorsInput = product.colors.join(', ');
            isEditing.value = true;
            window.scrollTo(0,0);
        };

        const deleteProduct = (id) => {
            if (!isAdmin.value) return alert("Only admin can delete products.");
            if(confirm('Are you sure you want to delete this item?')) {
                const product = products.value.find(p => p.id === id);
                products.value = products.value.filter(p => p.id !== id);
                if (product) logActivity('DELETE', `Deleted product: ${product.name}`);
            }
        };

        const resetForm = () => {
            isEditing.value = false;
            Object.assign(productForm, {
                id: null,
                name: '',
                price: 0,
                category: 'Hoodies',
                stock: 0,
                image: '',
                sizes: [],
                colors: [],
                sizesInput: 'S, M, L, XL',
                colorsInput: 'Black, White',
                material: 'Cotton',
                isLatest: false
            });
        };

        return {
            currentPage,
            mobileMenuOpen,
            showBackToTop,
            scrollToTop,
            showSizeGuide,
            currentWord,
            categories,
            products,
            filterCategory,
            maxPrice,
            filteredProducts,
            relatedProducts,
            selectedProduct,
            detailSize,
            detailColor,
            cart,
            cartCount,
            cartTotal,
            wishlist,
            toggleWishlist,
            isInWishlist,
            isEditing,
            productForm,
            navigate,
            isDarkMode,
            toggleTheme,
            currency,
            toggleCurrency,
            searchQuery,
            handleSearch,
            formatPrice,
            countdown,
            heroImages,
            currentHeroIndex,
            blogPosts,
            selectedPost,
            viewPost,
            viewProduct,
            addToCart,
            quickAdd,
            removeFromCart,
            updateQuantity,
            processCheckout,
            toggleAdmin,
            logoutAdmin,
            handleFileUpload,
            saveProduct,
            editProduct,
            deleteProduct,
            resetForm,
            activityLog
        };
    }
}).mount('#app');