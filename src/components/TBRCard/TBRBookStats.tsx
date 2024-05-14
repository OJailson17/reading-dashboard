import { DialogTrigger } from '../ui/dialog';

interface Book {
  title: string;
  author: string;
}

interface TBRBookStats {
  book: Book;
}

export const TBRBookStats = ({ book }: TBRBookStats) => {
  return (
    <>
      <DialogTrigger className="w-full bg-transparent text-left">
        <div className="flex w-full justify-between">
          <div>
            <p className="font-light text-span">{book.title}</p>
            <span className="text-sm font-light text-placeholder">
              {book.author}
            </span>
          </div>
        </div>
      </DialogTrigger>
    </>
  );
};
