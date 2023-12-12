import Title from "@/components/shared/Title"
import translation from "@/translations/getTranslation"
import Image from "next/image"
import Link from "next/link"


const IncomeTaxOrderPage = () => {
  return (
    <section className=" py-12">
      <div className="container mx-auto flex flex-col gap-4">
        <div className=" flex gap-4 flex-col items-center md:flex-row">
          <div>
            <Image src={"/images/income-tax.webp"} width={200} height={200} alt={"Product image"} />
          </div>
          <div className=" space-y-2">
            <Title type="h1">
              {translation.orderPages.incomeTax.title}
            </Title>
            <p className=" text-lg max-w-2xl">
              {translation.orderPages.incomeTax.description}
            </p>
          </div>
        </div>
        <div className=" flex items-center justify-center">
          <Link href="/" className="underline text-2xl font-serif text-theme-dark hover:text-theme-secondary cursor-pointer w-min whitespace-nowrap">
            {translation.orderPages.goBack}
          </Link>
        </div>
        <hr />
        <Title type="h2" className="text-theme-secondary">
          {translation.orderPages.moreTools}
        </Title>
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-4">

        </div>
      </div>
    </section>
  )
}

export default IncomeTaxOrderPage