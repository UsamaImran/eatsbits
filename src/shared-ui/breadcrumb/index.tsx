import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

interface BreadcrumbItemProps<T> {
  label: string;
  value: string;
  onClick?: (value: T) => void;
}

interface BreadcrumbProps<T> {
  items: BreadcrumbItemProps<T>[];
  separator?: React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps<any>> = ({
  items,
  separator = <IoIosArrowForward className='text-dark-2' />,
}) => {
  return (
    <nav aria-label='Breadcrumb'>
      <ol className='flex items-center'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center'>
            {index > 0 && separator} &nbsp;
            <Link
              to={item.value}
              className={`${
                index === items.length - 1
                  ? 'text-primary font-semibold'
                  : 'text-dark-2'
              } text-[14px]`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
