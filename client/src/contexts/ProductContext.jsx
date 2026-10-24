import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, initialCategories } from '../data/mockData.js';

const ProductContext = createContext(null);
const PRODUCTS_STORAGE_KEY = 'slsh_weaves_products_v17_design_hover_spotlight_mobile_nav_fix';
const CATEGORIES_STORAGE_KEY = 'slsh_weaves_categories_v17_design_hover_spotlight_mobile_nav_fix';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= initialProducts.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved products', e);
    }
    return initialProducts;
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === initialCategories.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved categories', e);
    }
    return initialCategories;
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to store products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to store categories', e);
    }
  }, [categories]);

  const addProduct = (newProduct) => {
    const productWithMeta = {
      ...newProduct,
      id: newProduct.id || 'slsh-' + Date.now(),
      sku: newProduct.sku || `SLSH-WEAVE-${Math.floor(100 + Math.random() * 900)}`,
      rating: newProduct.rating || 5.0,
      reviewCount: newProduct.reviewCount || 1,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [productWithMeta, ...prev]);
    return productWithMeta;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const adjustStock = (id, delta) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, (item.stock || 0) + delta);
          return {
            ...item,
            stock: newStock,
            availability: newStock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
          };
        }
        return item;
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const getProductBySlug = (slug) => {
    return products.find((p) => p.slug === slug || p.id === slug);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        addProduct,
        updateProduct,
        adjustStock,
        deleteProduct,
        getProductBySlug,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
}
