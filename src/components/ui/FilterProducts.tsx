import { Funnel, X } from 'lucide-react'
import { motion, type Variants } from 'motion/react'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'

export const filterVariant: Variants = {
    hidden: {
        opacity: 0,
        transform: 'translateX(-30px)'
    },
    show: {
        opacity: 1,
        transform: 'translateX(0px)',
        transition: {
            duration: 1
        }
    }
}

export interface CategoriesType {
    label: string
    slug: string
}

const categoryItems: CategoriesType[] = [
    {
        label: 'All Categories',
        slug: 'all'
    },
    {
        label: 'Jewelery',
        slug: 'jewelery'
    },
    {
        label: 'Electronics',
        slug: 'electronics'
    },
    {
        label: "Men's Clothing",
        slug: "men's clothing"
    },
    {
        label: "Women's Clothing",
        slug: "women's clothing"
    }
]

const FilterProducts = () => {
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)

    const { category, sortBy, handleCategoryChange, handleSortChange } = useAppContext()

    return (
        <div className='w-full lg:w-auto'>
            <button
                className="bg-blue-600 lg:hidden hover:bg-blue-500 text-white rounded-lg flex justify-center float-end items-center gap-2 cursor-pointer px-3 py-1.5"
                onClick={() => setIsFiltersOpen(prev => !prev)}
            >
                <span>Filters</span>
                <Funnel
                    size={17} />
                {isFiltersOpen && <X className='ml-2' size={17} />}
            </button>
            <motion.div
                variants={filterVariant}
                initial='hidden'
                animate='show'
                className={`${isFiltersOpen ? 'flex' : 'hidden'} lg:flex flex-col gap-5 rounded-lg w-full h-auto lg:w-75 mt-3 lg:mt-0`}>
                <div className="flex flex-col w-full bg-white rounded-lg shadow-lg p-5 gap-2">
                    <span className="font-medium pb-2 text-xl">Filter by Category</span>
                    {
                        categoryItems.map(item => (
                            <div className="flex justify-between items-center"
                                key={item.slug}>
                                <label
                                    htmlFor={item.label}
                                    className="">
                                    {item.label}
                                </label>
                                <input
                                    id={item.label}
                                    checked={category.includes(item.slug)}
                                    onChange={() => handleCategoryChange(item)}
                                    className="h-5 w-5"
                                    value={item.slug}
                                    name="category"
                                    type="checkbox"
                                />
                            </div>
                        ))
                    }
                </div>

                <div className="flex w-full flex-col p-5 rounded-lg bg-white shadow-lg">
                    <label className="font-medium mb-2 text-xl" htmlFor="sort">Sort by Price</label>
                    <select
                        onChange={handleSortChange}
                        value={sortBy}
                        className="border border-gray-300 focus:border-blue-500 focus:outline-none rounded-lg px-2 py-2" id="sort" name="sort">
                        <option value='all'>All</option>
                        <option value='price_asc'>Low to High</option>
                        <option value='price_desc'>High to Low</option>
                    </select>
                </div>
            </motion.div>
        </div>
    )
}

export default FilterProducts



