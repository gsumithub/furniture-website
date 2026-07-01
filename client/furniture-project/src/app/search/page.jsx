"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "@/utils/axiosInstance";
import Testimonial from "../component/common/Testimonial";
import ProductCard from "../component/home/ProductCard";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(`home/products?q=${encodeURIComponent(query.trim())}`);
        if (res.data._status) {
          setProducts(res.data.data || []);
          setPath(res.data.path || "");
        }
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      <Testimonial title={`Search Results: "${query}"`} />

      <div className="max-w-[1320px] mx-auto py-14 px-5">
        {loading ? (
          <div className="text-center py-10">
            <div className="w-10 h-10 border-4 border-[#C09578] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-500">Searching products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">No products found matching &ldquo;{query}&rdquo;.</p>
            <p className="text-gray-400 text-sm">Try checking your spelling or use more general keywords.</p>
          </div>
        ) : (
          <div className="grid xl:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6">
            {products.map((obj) => (
              <ProductCard
                key={obj._id}
                productId={obj._id}
                path={obj.image && obj.image.startsWith("http") ? obj.image : `${path}${obj.image}`}
                title={obj.name}
                price={obj.price}
                discountPri={obj.actualPrice}
                slug={obj.slug}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-20">
        <div className="w-10 h-10 border-4 border-[#C09578] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500">Loading Search...</p>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
