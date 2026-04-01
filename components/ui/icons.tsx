export const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor" // Segue o estilo do Lucide (apenas contorno)
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);


export const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor" // Isso permite que você mude a cor via texto no Tailwind (ex: text-blue-600)
    className={className}
  >
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.03 1.464-5.903 5.545-5.903 1.63 0 2.507.121 2.915.174v3.178h-1.911c-1.81 0-2.16.917-2.16 2.474v1.58h3.545l-.467 3.667h-3.078v7.98H9.101z" />
  </svg>
);