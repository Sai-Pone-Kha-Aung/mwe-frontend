import getCategory from "@/action/get-category";
import getColors from "@/action/get-colors";
import getProducts from "@/action/get-products";
import getSizes from "@/action/get-sizes";
import Billboard from "@/components/hero/billboard";
import Container from "@/components/ui/container";
import Filter from "@/app/(routes)/category/[categoryId]/components/filter";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/product/product-card";
import MobileFilter from "@/app/(routes)/category/[categoryId]/components/mobilefilter";

export const revalidate = 0;
interface CategoryPageProps {
    params: {
        categoryId: string;
    },
    searchParams: {
        colorId: string;
        sizeId: string;
    }
}
const CategoryPage: React.FC<CategoryPageProps> = async ({ params, searchParams }) => {
    const products = await getProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId
    })

    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(params.categoryId);

    return (
        <div>
            <Container>
                <Billboard data={category.billboard}/>
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilter sizes={sizes} colors={colors}/>
                        <div className="hidden lg:block">
                            <Filter
                                valueKey="sizeId"
                                name="Sizes"
                                data={sizes}
                            />
                            <Filter
                                valueKey="colorId"
                                name="Colors"
                                data={colors}
                            />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResult />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {products.map((item) => (
                                    <ProductCard key={item.id} data={item} />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    )
}   
export default CategoryPage