'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

const categoryList = ['accessories', 'bottoms', 'tops', 'footwear'];

// Image map based on your actual file names
const categoryImagesMap: Record<string, string[]> = {
  accessories: [
    '/assets/assignment%20nextjs/accessories/belt.jpg',
    '/assets/assignment%20nextjs/accessories/belt2.webp',
    '/assets/assignment%20nextjs/accessories/cap.png',
    '/assets/assignment%20nextjs/accessories/hat.png',
    '/assets/assignment%20nextjs/accessories/sunglasses.jpg',
  ],
  bottoms: [
    '/assets/assignment%20nextjs/bottoms/bottom1.webp',
    '/assets/assignment%20nextjs/bottoms/bottom2.webp',
    '/assets/assignment%20nextjs/bottoms/bottom3.jpg',
  ],
  tops: [
     '/assets/assignment%20nextjs/tops/top1.webp',
    '/assets/assignment%20nextjs/top2/top2.jpg',
    '/assets/assignment%20nextjs/top3/top3.jpg',
    '/assets/assignment%20nextjs/top4/top4.jpg',
  ],
  footwear: [
    '/assets/assignment%20nextjs/shoes/shoes1.webp',
    '/assets/assignment%20nextjs/shoes/shoes2.webp',
    '/assets/assignment%20nextjs/shoes/shoes3.jpg',
    '/assets/assignment%20nextjs/shoes/shoes4.jpg',
    '/assets/assignment%20nextjs/shoes/shoes5.png',
  ],
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('accessories');
  const [categoryImages, setCategoryImages] = useState<Record<string, string[]>>({});
  const [canvasItems, setCanvasItems] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    setCategoryImages(categoryImagesMap);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('item'));
    const rect = e.currentTarget.getBoundingClientRect();
    setCanvasItems(prev => [
      ...prev,
      {
        ...data,
        id: uuidv4(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    ]);
  };

  const allowDrop = (e: React.DragEvent) => e.preventDefault();

  const handleDragStart = (e: React.DragEvent, src: string, cat: string) => {
    e.dataTransfer.setData('item', JSON.stringify({ src, cat }));
  };

  const removeCanvasItem = (id: string) => {
    setCanvasItems(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = () => {
    setCartItems([...canvasItems]);
    alert('Outfit added to cart!');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-5">
      <h1 className="text-center text-4xl font-bold text-purple-700 mb-6">
        👗 Fashion Outfit Builder
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {categoryList.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-bold text-white ${
                  selectedCategory === cat
                    ? 'bg-purple-600'
                    : 'bg-purple-300 hover:bg-purple-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Selected Category Images */}
          <div className="bg-white rounded-xl shadow-md p-3 mt-2">
            <h2 className="text-lg font-semibold text-pink-600 capitalize mb-2">
              {selectedCategory}
            </h2>
            <div className="flex flex-wrap gap-2">
              {categoryImages[selectedCategory]?.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`${selectedCategory}-${index}`}
                  width={60}
                  height={60}
                  draggable
                  onDragStart={(e) => handleDragStart(e, src, selectedCategory)}
                  className="border rounded bg-white hover:scale-105 transition-transform"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div
          className="relative flex-1 h-[500px] bg-white border-4 border-dashed border-purple-400 rounded-xl shadow-inner"
          onDrop={handleDrop}
          onDragOver={allowDrop}
        >
          <p className="absolute top-1 left-2 text-sm text-gray-400">💡 Drag items here</p>
          {canvasItems.map(item => (
            <Image
              key={item.id}
              src={item.src}
              alt=""
              width={80}
              height={80}
              className="absolute cursor-pointer hover:scale-110 transition"
              style={{ top: item.y, left: item.x }}
              onClick={() => removeCanvasItem(item.id)}
            />
          ))}
        </div>

        {/* Cart */}
        <div className="md:w-1/4 bg-pink-50 rounded-xl p-4 shadow-lg">
          <h2 className="text-xl font-bold text-purple-700 mb-2">🛒 Cart</h2>
          {canvasItems.length === 0 ? (
            <p className="text-gray-500">No items on canvas</p>
          ) : (
            <ul className="list-disc list-inside text-sm text-purple-800 mb-2">
              {canvasItems.map((item, i) => (
                <li key={i}>{item.cat}</li>
              ))}
            </ul>
          )}

          <button
            disabled={canvasItems.length === 0}
            onClick={addToCart}
            className={`w-full mt-4 py-2 text-white font-bold rounded-full transition ${
              canvasItems.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90'
            }`}
          >
            Add Outfit to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
