using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace AngularChatroom.Hubs
{
    public class GameRoomHub : Hub
    {
        public Task SendStackCount(string user, int numOfCards)
        {
            return Clients.All.SendAsync("RecieveStackCount", user, numOfCards);
        }

        public Task RevealStack(string user, int[] cards)
        {
            return Clients.All.SendAsync("RecievePlayerStack", user, cards);
        }
    }
}