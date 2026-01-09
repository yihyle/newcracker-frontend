interface NewsItemProps {
  source: string;
  title: string;
  content: string;
  imageUrl?: string;
}

export default function NewsItem({ source, title, content, imageUrl }: NewsItemProps) {
  return (
    <div className="w-full h-32 flex flex-row cursor-pointer">
      <div className="w-50 h-full bg-black overflow-hidden flex justify-center items-center">{imageUrl && <img src={imageUrl} alt={title} className="w-full h-full object-cover" />}</div>
      <div className="w-full h-full bg-white px-5 flex flex-col justify-center gap-1.5">
        <p className="text-xs text-gray-400 font-medium">{source}</p>
        <p className="text-lg text-gray-800 font-medium">{title}</p>
        <p className="text-sm font-medium text-gray-400">{content}</p>
      </div>
    </div>
  );
}
