import '@radix-ui/react-dialog';

declare module '@radix-ui/react-dialog' {
  interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
  }
  interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
  }
  interface DialogTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string;
  }
} 