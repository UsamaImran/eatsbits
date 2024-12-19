import FoodItemCard from '@/components/cards/foodItemCard';
import { getImageURL } from '@/helpers';

import AnimationContainer from '@/shared-ui/animationContainer';
import Modal from '@/shared-ui/modal';
import Tabs from '@/shared-ui/tabs';
import Text from '@/shared-ui/text';
import { addToCart, openCart, closeCart } from '@/store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import restaurantSrc from '@/assets/images/restaurant.jpg';
import { useEffect, useState } from 'react';
import CartDrawer from '../cartDrawer';

import Accordion from '@/shared-ui/accordoin';
import useDisclosure from '@/hooks/useDisclosure';
import FullScreenModal from '@/shared-ui/modal/fullScreenModal';
import useSmallScreen from '@/hooks/useSmallScreen';
import MyDrawer from '@/shared-ui/drawer';
import CartDrawerMobile from '../cartDrawer/cartDrawerMobile';
import CartDrawerPC from '../cartDrawer/cartDrawerPC';
import Breadcrumb from '@/shared-ui/breadcrumb';
import useRestaurant from '@/api/restaurants/useRestaurant';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useFoodItem from '@/api/restaurants/useFoodItem';
import FoodItemDetailCard from '@/components/cards/foodItemDetailCard';
import { FoodItem, FoodItemOption } from '@/types';

interface Props {
  searchQuery: string;
}

function MenuListSection({ searchQuery }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSmall = useSmallScreen();
  const { isOpen: openModal, onClose, onOpen } = useDisclosure();
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const isOpen = useAppSelector((state) => state.cart.isOpenCart);
  const orderType = useAppSelector((state) => state.cart.orderType);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const { data } = useRestaurant();
  const { id } = useParams();

  const { data: foodItem } = useFoodItem();

  useEffect(() => {
    if (foodItem) {
      const currentItem = foodItem.itemsByCorrelationIds[0];
      setSelectedFood(currentItem);
    }
  }, [foodItem]);

  const categories: any[] =
    data?.stores[0].categories.filter((item: any) => !!item.items?.length) ||
    [];

  const name = data?.stores[0]?.name || 'Restaurant';

  const filteredCategories = categories.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.items?.some(
        (i: any) =>
          i.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.nonEnglishName.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const RenderBreadCrumb = () => (
    <div className='my-3'>
      <Breadcrumb
        items={[
          { label: 'Home', value: '/' },
          {
            label: name,
            value: `/restaurant/${id}`,
            onClick: () => onClose(),
          },
          {
            label: 'Menu',
            value: '#',
          },
        ]}
      />
    </div>
  );

  const renderCategoryItems = (categoryName: string) => (
    <div className='flex flex-col gap-7'>
      {categories
        .filter((item) => item.name === categoryName)
        .map((category: any, index: number) => (
          <CategorySection
            key={index}
            searchQuery={searchQuery}
            items={category.items}
            category={category.name}
            onSelect={setSelectedFood}
            onAddToCart={(quantity, item: FoodItem) => {
              if (item && !!item?.itemOptions?.length) {
                setSelectedFood(item);
              } else {
                handleAddToCart(quantity, [], item);
              }
            }}
          />
        ))}
    </div>
  );

  const handleAddToCart = (
    quantity: number,
    foodItemOptions?: FoodItemOption[],
    item?: FoodItem
  ) => {
    if (!!selectedFood || !!item) {
      const source = selectedFood ? selectedFood : item;
      if (source) {
        const { itemOptions, ...rest } = source;

        dispatch(
          addToCart({
            ...rest,
            uniqueId: '',
            itemOptions: foodItemOptions,
            quantity,
          })
        );
      }
    }
    dispatch(openCart());
    setSelectedFood(null);
  };

  const closeSelectedFoodModal = () => {
    const params = new URLSearchParams(location.search);
    params.delete('item');

    navigate({ search: params.toString() }, { replace: true });
    setSelectedFood(null);
  };

  return (
    <div>
      {/* PC */}
      <div className='xs:hidden lg:block'>
        <Tabs
          tabsData={filteredCategories.map((category: any) => ({
            id: category.correlationId,
            title: category.name,
            component: renderCategoryItems(category.name),
          }))}
        />

        <div>
          <Modal
            open={!!selectedFood && !isSmall}
            className={`${
              !!selectedFood?.itemOptions?.length
                ? '!max-w-screen-2xl !max-h-[96vh] '
                : ''
            } `}
            onClose={closeSelectedFoodModal}
            header={<Text variant='h6'>Details</Text>}
          >
            {selectedFood && (
              <FoodItemDetailCard
                {...selectedFood}
                displayDetails
                onAddToCart={handleAddToCart}
              />
            )}
          </Modal>
        </div>
        {isOpen && !isSmall && (
          <CartDrawerPC open={isOpen} onClose={() => dispatch(closeCart())}>
            <CartDrawer />
          </CartDrawerPC>
        )}
      </div>

      {/* Mobile */}
      <div className='xs:block lg:hidden'>
        <div className='flex flex-col'>
          {filteredCategories.map((category: any, index: number) => (
            <div
              key={index}
              role='button'
              onClick={() => {
                setSelectedTab(index);
                onOpen();
              }}
            >
              <Accordion
                className={'rounded-none min-h-[80px]'}
                title={
                  <div className='flex items-center gap-4'>
                    <img
                      src={
                        category?.bucketKeyName
                          ? getImageURL(category.bucketKeyName)
                          : restaurantSrc
                      }
                      className='size-16 object-contain'
                    />

                    <Text variant='small' className='text-left'>
                      {category.name}
                    </Text>
                  </div>
                }
              ></Accordion>
            </div>
          ))}
        </div>
        {openModal && (
          <FullScreenModal
            title={orderType.title}
            onBack={() => {
              onClose();
              setSelectedTab(0);
            }}
          >
            <AnimationContainer>
              <div>
                <div className='my-2'>
                  <Text className='text-[24px] font-semibold'>
                    {categories[selectedTab].name}
                  </Text>
                </div>
                <div>
                  <RenderBreadCrumb />

                  <div>
                    {filteredCategories[selectedTab]?.items
                      ?.filter((item: any) =>
                        item?.englishName
                          ?.toLowerCase()
                          .includes(searchQuery?.toLowerCase())
                      )
                      .map((item: any, index: number) => (
                        <div
                          key={index}
                          role='button'
                          onClick={() => setSelectedFood(item)}
                        >
                          <Accordion
                            className={'rounded-none min-h-[90px] w-full '}
                            title={
                              <div className='flex items-center gap-4 '>
                                <img
                                  src={
                                    item?.bucketKeyName
                                      ? getImageURL(item?.bucketKeyName)
                                      : restaurantSrc
                                  }
                                  className='size-16 object-contain'
                                />
                                <div className='w-[200px] text-left truncate  overflow-hidden'>
                                  <Text variant='small' className='text-left '>
                                    {item.englishName}
                                  </Text>
                                </div>
                              </div>
                            }
                          ></Accordion>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </AnimationContainer>
          </FullScreenModal>
        )}

        <div>
          <MyDrawer
            direction='bottom'
            lockBackgroundScroll
            size={'100%'}
            open={!!selectedFood && isSmall}
            onClose={closeSelectedFoodModal}
          >
            <div className='flex flex-col gap-3'>
              <Text className='font-semibold text-[28px] ml-3 '>Details</Text>
              {selectedFood && (
                <FoodItemDetailCard
                  {...selectedFood}
                  displayDetails
                  onAddToCart={handleAddToCart}
                />
              )}
            </div>
          </MyDrawer>
        </div>
        <div>
          {isSmall && isOpen && (
            <CartDrawerMobile onBack={() => dispatch(closeCart())}>
              <CartDrawer />
            </CartDrawerMobile>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuListSection;

const CategorySection = <T,>({
  items,
  category,
  onSelect,
  searchQuery,
  onAddToCart,
}: {
  items: T[];
  category: string;
  onSelect: (item: T) => void;
  searchQuery: string;
  onAddToCart: (quantity: number, item: T) => void;
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <div>
        <Text variant='h2'>{category}</Text>
      </div>
      <div className='flex flex-wrap gap-2'>
        {items
          ?.filter((item: any) =>
            item?.englishName
              ?.toLowerCase()
              .includes(searchQuery?.toLowerCase())
          )
          ?.map((item, index) => (
            <div key={index} role='button' onClick={() => onSelect(item)}>
              <FoodItemCard
                key={index}
                {...item}
                onAddToCart={(quantity) => {
                  onAddToCart(quantity, item);
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
