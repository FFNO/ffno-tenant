import { useUpdate } from '@/api';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import { useState } from 'react';

interface Props {
  unitId?: string;
  memberId?: string;
  propertyId?: string;
}

export const Reviews = (props: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number>(0);

  const mutate = useUpdate({ resource: 'reviews' });

  const handlePostReview = async () => {
    if (!!comment && !!rating) {
      mutate.mutate({
        ...props,
        comment,
        rating,
      });
    }
  };
  return (
    <>
      <div className="px-4 py-3 flex flex-row items-center gap-1 border-t">
        <Button onClick={onOpen}>Write a review</Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Comment</ModalHeader>
              <ModalBody>
                <p className="text-sm font-semibold">Rating</p>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={rating}
                  onChange={setRating}
                  itemStyles={{
                    itemShapes: RoundedStar,
                    activeFillColor: '#ffb700',
                    inactiveFillColor: '#fbf1a9',
                  }}
                />
                <Input
                  label="Comment"
                  fullWidth
                  variant="bordered"
                  placeholder="Write a comment"
                  value={comment}
                  onValueChange={(i) => setComment(i)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onClick={() => handlePostReview()}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
