import Loader from '@/shared-ui/loader';
import { lazy, Suspense } from 'react';

export const getComponent = (index: number) => {
  const LazyComponent = lazy(() =>
    import(
      `../../components/pages-components/signUp/signUpStepFormModal/components/steps/step${index}.tsx`
    ).then((module) => ({
      default: module.default,
    }))
  );

  return (
    <Suspense
      fallback={
        <div className='w-full flex justify-center'>
          <Loader />
        </div>
      }
    >
      <LazyComponent />
    </Suspense>
  );
};

export const formSteps = [...Array(2)].map((_, index) => ({
  name: `Step ${index + 1}`,
  component: getComponent(index + 1),
}));
