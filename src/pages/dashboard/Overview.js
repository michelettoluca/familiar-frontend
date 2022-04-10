import styled from "styled-components";

import { useQueries } from "react-query";
import { Link } from "react-router-dom";
import { useSession } from "../../contexts/SessionContext";

import * as api from "../../utils/familiarApi";
import { getQueriesStatus } from "../../utils/getQueriesStatus";

import * as Container from "../../components/shared/Container";
import * as T from "../../components/shared/Typography";
import * as Divider from "../../components/shared/Divider";

export const Overview = () => {
	const { user } = useSession();

	const queries = useQueries([
		{
			queryKey: ["league", user.leagueId],
			queryFn: () => api.getLeague({ leagueId: user.leagueId }),
		},
		{
			queryKey: ["league", user.leagueId, "leaderboard"],
			queryFn: () => api.getLeagueLeaderboard({ leagueId: user.leagueId }),
			initialData: [],
		},
	]);

	const status = getQueriesStatus(queries);

	const [{ data: league }, { data: leaderboard }] = queries;

	if (status === "loading") return <span>loading...</span>;

	// if (status === "error") return <span>error</span>;

	return (
		<>
			<T.Heading3>{league.name}</T.Heading3>{" "}
			<T.Paragraph>{league.tag}</T.Paragraph>
			<Divider.Horizontal />
			<Container.Root>
				{leaderboard?.length ? (
					leaderboard.map(({ player, points }) => (
						<div
							key={player.id}
							className="flex items-start justify-between px-8 py-5 last:border-b-0 border-b border-b-gray-200"
						>
							<div className="flex flex-col gap-1">
								<div className="flex items-baseline gap-x-1">
									<Link
										to={`${player.id}`}
										className="font-medium hover:underline decoration-2 cursor-pointer"
									>
										{player.firstName} {player.lastName}
									</Link>
									<span className="text-xs font-normal text-gray-400">
										({player.identifier})
									</span>
								</div>
							</div>
							<span>{points}</span>
						</div>
					))
				) : (
					<T.EmptyState>Nessun evento trovato</T.EmptyState>
				)}
			</Container.Root>
		</>
	);
};
