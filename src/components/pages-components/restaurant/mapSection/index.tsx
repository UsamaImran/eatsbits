import Text from '@/shared-ui/text';

function MapSection() {
  return (
    <div className="mt-3">
      <div>
        <Text as={'div'} variant="body">
          On the map
        </Text>
      </div>
      <div>{/* Add map component here */}</div>
    </div>
  );
}

export default MapSection;
