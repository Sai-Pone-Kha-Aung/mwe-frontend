'use client';

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import  Currency  from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler, use } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
    data: Product
}
const ProductCard: React.FC<ProductCardProps> = ({data}) => {
    
    const router = useRouter();
    const previewModal = usePreviewModal();
    const cart = useCart();

    const imageUrl = data?.images?.[0]?.url;
    const isValidUrl = imageUrl && (imageUrl.startsWith('http://') || imageUrl.startsWith
    ('https://'));

    const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        previewModal.onOpen(data);
    }

    const onAddtoCart: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        cart.addItem(data);
    }

    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    }

    return (
       <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
        <div className="aspect-square rounded-xl bg-gray-100 relative">
            <Image
                src={isValidUrl? imageUrl : ""}
                fill
                alt="Image"
                className="object-cover aspect-square rounded-md"
            />
            <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                <div className="flex gap-x-6 justify-center">
                    <IconButton 
                    onClick={onPreview} 
                    icon={<Expand size={20} className="text-gray-600"/>} 
                    />
                    <IconButton 
                    onClick={onAddtoCart} 
                    icon={<ShoppingCart size={20} className="text-gray-600"/>} 
                    />
                </div>
            </div>
        </div>
        <div>
            <p className="font-semibold text-lg">
                {data.name}
            </p>
            <p className="text-sm text-gray-500">
                {data.category?.name}
            </p>
        </div>
        <div className="flex items-center justify-between">
            <Currency value={data?.price}/>
        </div>
       </div>
    )
}
export default ProductCard;