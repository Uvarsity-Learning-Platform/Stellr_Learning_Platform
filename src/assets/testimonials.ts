// Testimonial type for testimonials data
export interface Testimonial {
  name: string;
  location: string;
  content: string;
  image: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
   name: "Albert Gyan",
   location: "Kumasi, GH",
   title: "THE DESIGNER'S DESIGNER",
   content: '"Lorem ipsum dolor sit amet consectetur. Aliquam vitae vulputate vitae id mauris odio pharetra nisl non. Ornare nisl.Lorem ipsum dolor sit amet consectetur. Aliquam vitae vulputate vitae id mauris odio pharetra nisl non. Ornare nisl.Lorem ipsum dolor sit amet consectetur. Aliquam vitae vulputate vitae id mauris odio pharetra nisl non. "t',
   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  {
   name: "Chris Davis",
   location: "Cape Town, SA",
   title: "HEADING",
   content: '"Lorem ipsum dolor sit amet consectetur. Aliquam vitae vulputate vitae id mauris odio pharetra nisl non. Ornare nisl.Lorem ipsum dolor sit amet consectetur. Aliquam vitae vulputate vitae id mauris odio pharetra nisl non. Ornare nisl.Lorem ipsum dolor sit amet consectetur. Aliquam vitae vulputate vitae id mauris odio pharetra nisl non."',
   image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  },
  {
   name: "Sarah Johnson",
   location: "Lagos, NG",
   title: "THE CREATIVE MIND",
   content: '"Lorem ipsum dolor sit amet consectetur. Aliquam vitae vulputate vitae id mauris odio pharetra nisl non. Ornare nisl.Lorem ipsum dolor sit amet consectetur. Aliquam vitae vulputate vitae id mauris odio pharetra nisl non. Ornare nisl.Lorem ipsum dolor sit amet consectetur. Aliquam vitae vulputate vitae id mauris odio pharetra nisl non."',
   image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
  }
];

export default testimonials;