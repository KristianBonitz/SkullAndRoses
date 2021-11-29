using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace AngularChatroom.Hubs
{
    public class GameHub : Hub
    {
        public Task JoinGroup(string connectionId, string groupName)
        {
            Groups.AddToGroupAsync(connectionId, groupName);
            return Clients.Client(connectionId).SendAsync("InRoom");
        }

        public Task LeaveGroup(string connectionId, string groupName)
        {
            return Groups.RemoveFromGroupAsync(connectionId, groupName);
        }
        public Task SendPlayerReady(string group, string client, object user)
        {
            return Clients.Group(group).SendAsync("RecieveReady", user);
        }

        public Task RequestAllReadyPlayers(string group, string client, bool _)
        {
            return Clients.GroupExcept(group, client).SendAsync("RequestingAllReadyPlayers", true);
        }

        public Task SendAllReadyPlayers(string group, string client, object[] playerList)
        {
            return Clients.Group(group).SendAsync("SendingAllReadyPlayers", playerList);
        }

        public Task SendGameState(string group, string client, object roomData)
        {
            return Clients.Group(group).SendAsync("SendingGameState", roomData);
        }

        public Task StartGame(string group, string client, bool state)
        {
            return Clients.Group(group).SendAsync("StartingGame", state);
        }

        public Task EndTurn(string group, string client, object playerData)
        {
            return Clients.Group(group).SendAsync("EndingTurn", playerData);
        }

        public Task UpdatePlayerState(string group, string client, object playerData)
        {
            //.SendAsync("thing");
            return Clients.GroupExcept(group, client).SendAsync("PlayerUpdated", playerData);
        }

        public Task RoundOver(string group, string client, bool state)
        {
            return Clients.Group(group).SendAsync("EndRound", state);
        }

        public Task GameOver(string group, string client, double winningPlayerId)
        {
            return Clients.Group(group).SendAsync("EndGame", winningPlayerId);
        }

        public Task RequestCardReveal(string group, string client, double playerId)
        {
            return Clients.Group(group).SendAsync("RevealCardRequest", playerId);
        }

        public Task RevealCard(string group, string client, object cardData)
        {
            return Clients.Group(group).SendAsync("CardRevealed", cardData);
        }
    }
}