function LocationIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={21} height={21} fill='none'>
      <mask
        id='a'
        width={21}
        height={21}
        x={0}
        y={0}
        maskUnits='userSpaceOnUse'
        style={{
          maskType: 'alpha',
        }}
      >
        <path fill='#D9D9D9' d='M0 0h21v21H0z' />
      </mask>
      <g mask='url(#a)'>
        <path
          fill='#666'
          d='m13.125 18.375-5.25-1.837-4.069 1.575a.79.79 0 0 1-.81-.099.864.864 0 0 1-.371-.733V5.031c0-.19.055-.357.164-.503a.988.988 0 0 1 .448-.328l4.638-1.575 5.25 1.838 4.069-1.575a.79.79 0 0 1 .81.098.864.864 0 0 1 .371.733v12.25c0 .19-.055.357-.164.503a.988.988 0 0 1-.448.328l-4.638 1.575Zm-.875-2.144V5.994l-3.5-1.225v10.237l3.5 1.225Zm1.75 0 2.625-.875V4.987L14 5.994V16.23Zm-9.625-.219L7 15.006V4.77l-2.625.875v10.368Z'
        />
      </g>
    </svg>
  );
}

export default LocationIcon;
