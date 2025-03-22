import { Doctor } from '@/interfaces/doctor';
import Image from 'next/image';

const Writer: React.FC<Doctor> = ({name, surname, specialty, shortAbout, profileImage}) => {
    return (
        <div className="flex flex-col items-center text-center w-full mx-auto p-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                    src={profileImage? profileImage.imageUrl : "/images/singleblog-review1.png"}
                    alt="Billy Wallson profile photo"
                    fill
                    sizes="(max-width: 768px) 100px, 96px"
                    className="object-cover"
                    priority
                />
            </div>

            <h2 className="text-2xl font-bold text-[#030d43]">{name} {surname}</h2>
            <p className="text-[#757887] mb-4">{specialty}</p>

            <p className="text-[#757887] leading-relaxed">
                {shortAbout}
            </p>
        </div>
    );
};

export default Writer;