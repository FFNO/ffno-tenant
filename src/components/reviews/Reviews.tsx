import { useCreate } from '@/api';
import { DATE_FORMAT, IReviewRatingResDto, IReviewResDto } from '@/libs';
import {
  Avatar,
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  useDisclosure,
} from '@nextui-org/react';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import { useRouter } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { StarIcon } from 'hugeicons-react';
import { useState } from 'react';

interface Props {
  rating: IReviewRatingResDto;
  reviews: IReviewResDto[];
  unitId?: string;
  memberId?: string;
  propertyId?: string;
}

export const Reviews = (props: Props) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number>(0);

  const mutate = useCreate({
    resource: 'reviews',
    onSuccess() {
      router.invalidate();
    },
  });

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
      <div className="py-3 flex flex-row items-center gap-1 border-t">
        <Button color="primary" onClick={onOpen}>
          Write a review
        </Button>
      </div>
      <div className="inline-flex gap-4 w-full">
        <Card className="p-4">
          <div className="inline-flex items-center gap-2">
            <StarIcon color="yellow" fill="yellow" />
            <p>{`${props.rating.rating ?? 0}/5 (Based on ${props.reviews.length} reviews)`}</p>
          </div>
          <div className="w-[300px] gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div className="flex flex-col gap-2" key={i}>
                <div className="flex flex-row justify-between">
                  <p>{i} stars</p>
                  <p>{props.rating.ratingMap[i]}%</p>
                </div>
                <Progress value={props.rating.ratingMap[i]} />
              </div>
            ))}
          </div>
        </Card>
        <div className="flex-1 flex flex-col gap-2 border rounded-md p-4">
          {props.reviews.length ? (
            props.reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-2 pb-2 border-b"
              >
                <div className="inline-flex justify-between items-center">
                  {/* Author */}
                  <div className="inline-flex items-center gap-2">
                    <Avatar src={review.author.imgUrl} />
                    <div className="flex flex-col">
                      <p className="font-semibold">{review.author.name}</p>
                      <p className="text-xs">
                        {dayjs(review.createdAt).format(DATE_FORMAT)}
                      </p>
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="inline-flex">
                    {Array.from({
                      length: Math.round(review.rating),
                    }).map((_, index) => (
                      <StarIcon key={index} color="yellow" fill="yellow" />
                    ))}
                  </div>
                </div>
                <div>{review.comment}</div>
              </div>
            ))
          ) : (
            <div className="flex h-full justify-center items-center">
              <Button color="primary" onClick={onOpen}>
                No comment yet. Leave a comment now!
              </Button>
            </div>
          )}
        </div>
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
