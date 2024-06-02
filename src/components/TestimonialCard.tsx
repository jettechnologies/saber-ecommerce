type TestimonialProps = {
  img: string,
  name: string,
  children?: React.ReactNode;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ img, name, children }) => {
  return (
    <div className="bg-gray rounded-md w-full h-full p-10">
      <div className="flex flex-col items-center text-center">
        <img src={img} alt={name} className="w-20 rounded-full border-2 mb-4" />
        <h3 className="font-bold pb-2">{name}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default TestimonialCard;
