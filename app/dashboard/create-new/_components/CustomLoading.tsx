import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function CustomLoading({loading}: any) {
    return (
        <AlertDialog open={loading}>
            
            <AlertDialogContent className="flex items-center space-x-4">
                    <img src="/progress.gif" alt="" width={100} height={100} />
                <div>
                    <AlertDialogTitle>
                        Loading...
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Generating you video... Do no refrash.
                    </AlertDialogDescription>
                
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CustomLoading