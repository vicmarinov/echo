import AddComment from '../add-comment/AddComment.tsx';

export default function CommentSection () {
    return (
        <section>
            <h2>Comments</h2>

            <AddComment />

            <p>Here should be the list of comments.</p>
        </section>
    );
}