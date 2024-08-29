import ProductCard from "./ProductCard"
import "./ProductGrid.css"

interface IProps {
    products: any[];
}

export default function BasicProductGrid({ products }: IProps) {
    return (
        <section className="my-20 px-8 lg:px-20">
            {products ? (
                <div className="product-grid lg:flex-1">
                    {products.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">No products found</div>
            )}
        </section>
    )
}