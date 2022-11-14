export type Board = {
  title: string;
  description: string;
};

export type BoardsContainerProps = {
  boards: Board[];
};

export type BoardConfig = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}