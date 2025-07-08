"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

import { MessagesContainer } from "../components/messages-container"
import { Suspense, useState } from "react"
import { Fragment } from "@/generated/prisma"
import { ProjectHeader } from "../components/project-header"
import { Tabs } from "@/components/ui/tabs"
import { FragmentWeb } from "../components/fragment-web"


interface Props{
    projectId: string
}

export const ProjectView = ({projectId}: Props) => {
    const [activeFragment, setActiveFragment] = useState<Fragment | null>(null)
    const [tabState, setTabState] = useState<"preview" | "code">("preview")

    return(
        <div className="h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={35}
                    minSize={20}
                    className="flex flex-col min-h-0"
                >   
                    <Suspense fallback={<p>Loading Projects...</p>}>
                        <ProjectHeader projectId={projectId} /> 
                    </Suspense>  
                    <Suspense fallback={<p>Loading Messages...</p>}>
                        <MessagesContainer 
                            projectId={projectId} 
                            activeFragment={activeFragment}
                            setActiveFragment={setActiveFragment}
                        />
                    </Suspense>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel
                    defaultSize={65}
                    minSize={50}
                    
                >
                    {/* <Tabs
                        className="h-full gap-y-0"
                        defaultValue="preview"
                        value={tabState}
                        onValueChange={(value)=>setTabState}
                    > */}
                        {!!activeFragment && <FragmentWeb data={activeFragment}/>}
                    {/* </Tabs> */}
                    {/* {JSON.stringify(messages, null, 2)} */}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}