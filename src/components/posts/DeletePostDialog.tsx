import { PostData } from "@/lib/types";
import { useDeletePostMutation } from "@/components/posts/mutations";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import LoadingButton from "@/components/LoadingButton";
import { Button } from "../ui/button";

interface DeletePostDialogProps {
  post: PostData;
  open: boolean;
  onClose: () => void;
}

const DeletePostDialog = ({ post, open, onClose }: DeletePostDialogProps) => {
  const mutation = useDeletePostMutation();

  const handleOpenChange = (open: boolean) => {
    if (!open || !mutation.isPending) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete post?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}
            loading={mutation.isPending}
          >
            Delete
          </LoadingButton>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeletePostDialog;
