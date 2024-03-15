export default function formatDate(time:Date){
    const date = new Date(time);
    return date.toLocaleString();
}