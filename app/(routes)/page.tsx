import Billboard from "@/components/hero/billboard";
import Container from "@/components/ui/container";
import getBillboards from "@/action/get-baillboards";
import getProducts from "@/action/get-products";
import ProductList from "@/components/product/product-list";

export const revalidate = 0;
export const HomePage = async () => {
  const products = await getProducts({isFeatured: true});
  const billboard = await getBillboards("5a2436a0-ce50-40f4-8cd7-97d62419ce62");

  return (
    <Container>
       <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
       </div>
       <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products}/>
       </div>
    </Container>
  )
}

export default HomePage;