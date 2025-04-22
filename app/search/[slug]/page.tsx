import getRepositoryDetailAction from "@/app/actions/search/get_repository_detail_action";
import RepositoryDetailComponent from "@/components/search/repository/RepositoryDetailComponent";

interface SearchPageProps {
  searchParams: Promise<{
    repositoryName: string;
    ownerName: string;
  }>;
}
export default async function Page({
  searchParams
}: SearchPageProps) {
  const params = await searchParams;
  const repositoryName = params.repositoryName;
  const ownerName = params.ownerName;
  const repositoryDetail = await getRepositoryDetailAction(
    ownerName,
    repositoryName
  );
  return (
    <div className="flex flex-col items-center justify-center">
      <RepositoryDetailComponent
        fullName={repositoryDetail.fullName}
        language={repositoryDetail.language}
        ownerIconUrl={repositoryDetail.ownerIconUrl}
        stars={repositoryDetail.stars}
        watchers={repositoryDetail.watchers}
        forks={repositoryDetail.forks}
        issues={repositoryDetail.issues}
      />
    </div>
  );
}