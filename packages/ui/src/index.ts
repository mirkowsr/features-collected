// ─── Utilities ────────────────────────────────────────────────────
export { cn } from './utils'

// ─── Animation Presets ────────────────────────────────────────────
export {
  overlayAnimation,
  contentAnimation,
  slideDownAnimation,
  slideUpAnimation,
  sheetAnimation,
  collapseAnimation,
  tooltipAnimation,
} from './animations/presets'

// ─── Components ───────────────────────────────────────────────────
export { Alert, AlertTitle, AlertDescription, alertVariants, type AlertProps, type AlertTitleProps, type AlertDescriptionProps } from './components/alert'
export { Badge, badgeVariants, type BadgeProps } from './components/badge'
export { Button, buttonVariants, type ButtonProps } from './components/button'
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardFooterProps,
} from './components/card'
export { Input, type InputProps } from './components/input'
export { Label, type LabelProps } from './components/label'
export { Separator, type SeparatorProps } from './components/separator'
export { Skeleton, type SkeletonProps } from './components/skeleton'
export { Textarea, type TextareaProps } from './components/textarea'

// ─── Phase 2: Interactive Components ──────────────────────────────
export { Toggle, toggleVariants, type ToggleProps } from './components/toggle'
export { Switch, type SwitchProps } from './components/switch'
export { Checkbox, type CheckboxProps } from './components/checkbox'
export {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupProps,
  type RadioGroupItemProps,
} from './components/radio-group'
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
} from './components/tabs'
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
} from './components/accordion'
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  type AvatarProps,
  type AvatarImageProps,
  type AvatarFallbackProps,
} from './components/avatar'
export {
  ScrollArea,
  ScrollBar,
  type ScrollAreaProps,
  type ScrollBarProps,
} from './components/scroll-area'

// ─── Phase 3: Overlays ───────────────────────────────────────────
export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  type TooltipTriggerProps,
  type TooltipContentProps,
} from './components/tooltip'
export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  type PopoverTriggerProps,
  type PopoverAnchorProps,
  type PopoverContentProps,
} from './components/popover'
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  type DropdownMenuTriggerProps,
  type DropdownMenuGroupProps,
  type DropdownMenuRadioGroupProps,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuLabelProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuShortcutProps,
  type DropdownMenuSubContentProps,
  type DropdownMenuSubTriggerProps,
} from './components/dropdown-menu'
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  type SelectGroupProps,
  type SelectValueProps,
  type SelectTriggerProps,
  type SelectScrollUpButtonProps,
  type SelectScrollDownButtonProps,
  type SelectContentProps,
  type SelectLabelProps,
  type SelectItemProps,
  type SelectSeparatorProps,
} from './components/select'
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  type DialogTriggerProps,
  type DialogCloseProps,
  type DialogOverlayProps,
  type DialogContentProps,
  type DialogHeaderProps,
  type DialogFooterProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
} from './components/dialog'
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  type AlertDialogTriggerProps,
  type AlertDialogOverlayProps,
  type AlertDialogContentProps,
  type AlertDialogHeaderProps,
  type AlertDialogFooterProps,
  type AlertDialogTitleProps,
  type AlertDialogDescriptionProps,
  type AlertDialogActionProps,
  type AlertDialogCancelProps,
} from './components/alert-dialog'
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetVariants,
  type SheetTriggerProps,
  type SheetCloseProps,
  type SheetOverlayProps,
  type SheetContentProps,
  type SheetHeaderProps,
  type SheetFooterProps,
  type SheetTitleProps,
  type SheetDescriptionProps,
} from './components/sheet'

// ─── Phase 4: Data Display ───────────────────────────────────────
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableRowProps,
  type TableHeadProps,
  type TableCellProps,
  type TableCaptionProps,
} from './components/table'
