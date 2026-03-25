import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '../../utils'

type AvatarProps = React.ComponentPropsWithRef<typeof AvatarPrimitive.Root>

function Avatar({
  className,
  ref,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  )
}

type AvatarImageProps = React.ComponentPropsWithRef<typeof AvatarPrimitive.Image>

function AvatarImage({
  className,
  ref,
  ...props
}: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn('aspect-square h-full w-full', className)}
      {...props}
    />
  )
}

type AvatarFallbackProps = React.ComponentPropsWithRef<typeof AvatarPrimitive.Fallback>

function AvatarFallback({
  className,
  ref,
  ...props
}: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full',
        'bg-muted text-muted-foreground text-sm font-medium',
        className,
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  type AvatarProps,
  type AvatarImageProps,
  type AvatarFallbackProps,
}
