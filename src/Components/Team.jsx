const Team = ({ avatar, title, name }) => {
  return (
    <div className="flex gap-[10px] h-[48px] mb-[20px]">
      <div className="w-[42px] h-[42px] overflow-hidden">
        <img
          className=" object-cover w-full h-full rounded-full"
          src={avatar}
          alt=""
        />
      </div>
      <div className="flex flex-col">
        <span className="text-[16px] font-[500] font-['work_sans'] leading-[22px]">
          {name}
        </span>
        <span className="text-[12px] text-[#878790] font-[400] font-['work_sans']">
          {title}
        </span>
      </div>
    </div>
  );
};

export default Team;
