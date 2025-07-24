"use client"

import * as React from "react"
import {
  PanelGroup as ResizablePanelGroup,
  Panel as ResizablePanel,
  PanelResizeHandle as ResizableHandle,
  type PanelGroupRef, // Adicionado exportação do tipo PanelGroupRef
} from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = React.forwardRef<
  PanelGroupRef, // Usando PanelGroupRef aqui
  React.ComponentPropsWithoutRef<typeof ResizablePanelGroup>
>(({ className, ...props }, ref) => (
  <ResizablePanelGroup
    ref={ref}
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
))
ResizablePanelGroup.displayName = "ResizablePanelGroup"

const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof ResizablePanel>,
  React.ComponentPropsWithoutRef<typeof ResizablePanel>
>(({ className, ...props }, ref) => (
  <ResizablePanel
    ref={ref}
    className={cn("flex h-full w-full flex-col", className)}
    {...props}
  />
))
ResizablePanel.displayName = "ResizablePanel"

const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof ResizableHandle>,
  React.ComponentPropsWithoutRef<typeof ResizableHandle>
>(({ className, withHandle, ...props }, ref) => (
  <ResizableHandle
    ref={ref}
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        {/* <GripVertical className="h-2.5 w-2.5" /> */} {/* Removido conforme solicitação anterior */}
      </div>
    )}
  </ResizableHandle>
))
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle, type PanelGroupRef }