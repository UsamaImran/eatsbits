function Loader({ ...rest }: React.ComponentProps<'div'>) {
  return (
    <div
      role='status'
      aria-label='loading'
      {...rest}
      className={`animate-spin inline-block size-6 border-[3px] border-primary border-t-transparent text-blue-600 rounded-full dark:text-blue-500 ${rest.className}`}
    />
  );
}

export default Loader;
