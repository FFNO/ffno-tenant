import {
  Facebook01Icon,
  InstagramIcon,
  Linkedin01Icon,
  TwitterIcon,
} from 'hugeicons-react';

export default function AppFooter() {
  return (
    <div className="flex flex-row justify-between border-t text-default-500 bg-primary-50 px-2  md:px-48 py-4">
      <p>©2024 FFNO. All rights reserved</p>
      <div className="flex flex-row gap-4">
        <Facebook01Icon />
        <InstagramIcon />
        <TwitterIcon />
        <Linkedin01Icon />
      </div>
    </div>
  );
}
