interface ProductPageProps {
    params: {
        productId: string
    }
}

const ProductPage: React.FC<ProductPageProps> = ({
    params
}) => {
    
    return (
        <div>
            <h1>Product Page</h1>
        </div>
    )
}

export default ProductPage;