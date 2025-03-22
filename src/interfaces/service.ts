export interface Image {
    id: number;
    imageUrl: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
    createdAt: string;  
    updatedAt: string; 
    images: Image[];
}

export interface AboutUsProps {
    data?: {
        title: string;
        description: string;
        images: { imageUrl: string }[];
    };
}


