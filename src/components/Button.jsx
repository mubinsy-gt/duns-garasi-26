import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-[#A5E849] text-[#101114] hover:bg-[#B9F465] shadow-[0_0_20px_-4px_rgba(165,232,73,0.5)] hover:shadow-[0_0_30px_-4px_rgba(165,232,73,0.75)]',
  secondary: 'bg-transparent border border-[#A5E849]/60 text-[#A5E849] hover:bg-[#A5E849]/10 hover:border-[#A5E849]',
  ghost: 'bg-transparent border border-white/20 text-[#F5F5F5] hover:bg-white/10 hover:border-white/40',
  danger: 'bg-[#E63B36] text-white hover:bg-[#F0524E] shadow-[0_0_20px_-4px_rgba(230,59,54,0.5)] hover:shadow-[0_0_30px_-4px_rgba(230,59,54,0.75)]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  external = false,
  fullWidth = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  isWhatsApp = false,
}) {
  const baseStyle = `
    relative inline-flex items-center justify-center gap-2.5 font-heading font-semibold
    rounded-sm transition-all duration-300 ease-out cursor-pointer
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5E849] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101114]
    disabled:opacity-40 disabled:pointer-events-none tracking-wide uppercase
    ${fullWidth ? 'w-full' : ''}
    ${size === 'sm' ? 'text-xs px-4 py-2.5' : size === 'lg' ? 'text-sm px-7 py-4' : 'text-sm px-5 py-3'}
    ${variants[variant]}
    ${className}
  `;

  const iconSize = size === 'lg' ? 20 : 16;

  const inner = (
    <>
      {Icon && iconPosition === 'left' && !isWhatsApp && <Icon size={iconSize} className="shrink-0" />}
      {Icon && iconPosition === 'left' && isWhatsApp && <img src="/images/walogo.png" alt="WhatsApp" className={`${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} object-contain shrink-0`} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && !isWhatsApp && <Icon size={iconSize} className="shrink-0" />}
      {Icon && iconPosition === 'right' && isWhatsApp && <img src="/images/walogo.png" alt="WhatsApp" className={`${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} object-contain shrink-0`} />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={baseStyle}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyle}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.button>
  );
}
