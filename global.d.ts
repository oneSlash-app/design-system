// types/global.d.ts
export {}
declare global {

    interface CommentReactionProps {
      reactions: any;
      isArchiveComment?: boolean;
    }

    interface TimeStampProps{
      createdAt: string | number | Date;
      dateFormat: 'absolute' | 'relative';
    }

    interface CheckboxProps {
      label?: string;
      checked?: boolean;
      onChange?: (checked: boolean) => void;
    }
    
    interface ReactionIconButtonProps {
      size?: "small" | "medium" | "large";
      color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
      figmaCommentId: string;
      fileKey?: string;
      accountId: string;
      selectedHeadCommentId?: any;
      associatedAccountId?: any;
    }

    interface CheckIconButtonProps {
      size: "small" | "medium" | "large";
      color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
    }

    interface UncheckIconButtonProps {
      size: "small" | "medium" | "large";
      color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
    }

    interface ButtonProps{
      size: 'large' | 'medium' | 'small';
      type: 'primary' | 'secondary' | 'tertiary' | 'textOnly';
      state: 'enabled' | 'hovered' | 'selected' | 'focused' | 'disabled';
      label: string;
      iconLeftName?: keyof typeof HeroIcons;
      iconRightName?: keyof typeof HeroIcons;
      onClick?: any;
    }

    interface IconButtonProps{
      variant: "contained" | "iconOnly";
      color: "primary" | "secondary";
      state: "enabled" | "selected" | "disabled";
      iconName: keyof typeof HeroIcons;
      onClick?: any;
    }

    interface TagProps{
      key?: any;
      variant: "contained" | "textOnly";
      size: "medium" | "small";
      state?: "enabled" | "selected" ;
      label: any;
      iconName?: keyof typeof HeroIcons;
      isDeletable?: keyof typeof HeroIcons;
      onClick?: any;
      color?: 'default' | 'info';
    }

    interface EmptyBoxProps{
      text: string;
      size: "small" | "large";
    }

    interface TabPanelProps {
      children?: React.ReactNode;
      index: number;
      value: number;
    }

    interface TextFieldProps {
      id: string;
      label?: string;
      value: string;
      onChange: any;
      iconLeft?: any;
      iconRight?: React.ReactNode | React.ComponentType<any>; 
      multiline?: boolean;
      maxRows?: number;
      disabled?: boolean;
      error?: boolean;
    }

    interface ModalProps {
      isOpen: boolean;
      title: string;
      children: React.ReactNode;
      onClose: () => void;
      actions?: React.ReactNode;
    }

    interface MenuItemProps {
      href?: string;
      iconName?: string;
      label: string;
      isSelected?: boolean;
      onClick: any;
    }

    type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

    interface TooltipProps {
      title: string;
      children: React.ReactElement;
    }

    interface UserImageProps {
      userHandle: string;
      userImgUrl?: string;
    }

    interface AlertProps {
      open: boolean;
      type: string;
      message: string;
      onClose: () => void;
    }

    interface PopoverProps {
      id?: string;
      anchorEl: HTMLElement | null;
      open: boolean;
      onClose: () => void;
      children: ReactNode;
    }

    interface ScrapTagProps{
      comment?: any;
    }

    type TabProps = {
      label: string;
      href?: string;
      isSelected: boolean;
      onClick: () => void;
      iconName?: string;
    };

}

declare module '@heroicons/react/*' {
  const content: any;
  export default content;
}