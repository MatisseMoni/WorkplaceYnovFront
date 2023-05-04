import { sortUsersByNickname } from "./UserList";

test('Sort users by nickname', () => {
    const users = [
        { nickname: 'b' },
        { nickname: 'a' },
        { nickname: 'd' },
        { nickname: 'c' },
    ];

    const expected = [
        { nickname: 'a' },
        { nickname: 'b' },
        { nickname: 'c' },
        { nickname: 'd' },
    ];

    const res = sortUsersByNickname(users);

    expect(res).toEqual(expected);
});