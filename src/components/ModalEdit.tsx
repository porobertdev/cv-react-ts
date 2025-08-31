import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

export default function ModalEdit(props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Reset modal form when opening for add
  const handleAdd = () => {
    form.reset({
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      currentlyWorking: false,
    });
    setIsEditing(false);
    setEditIndex(null);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* ADD/EDIT MODAL */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer" onClick={handleAdd}>
            <CirclePlus />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{isEditing ? 'Edit Job' : 'Add Job'}</AlertDialogTitle>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
              {/* FORM FIELDS */}
              {children}

              <AlertDialogFooter>
                {isEditing && (
                  <AlertDialogAction
                    className="bg-destructive"
                    onClick={() => editIndex !== null && handleDelete(editIndex)}
                  >
                    Delete
                  </AlertDialogAction>
                )}
                <AlertDialogCancel
                  onClick={() => {
                    form.reset();
                    setIsEditing(false);
                    setEditIndex(null);
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction type="submit" disabled={!form.formState.isValid}>
                  {isEditing ? 'Update' : 'Add'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
