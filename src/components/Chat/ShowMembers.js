import styled from 'styled-components';
import userDefaultImage from '../../assets/userDefaultImage.png'

const ShowMembers = ({
	open,
	onClose,
    channelName,
    membersList
}) => {
	if (!open) return null;

	return (
		<Container>
			<Modal>
				<Header>
					<h2>#{channelName}</h2>
					<CloseIcon onClick={onClose}>
						<box-icon name='x' color='#686868' ></box-icon>
					</CloseIcon>
				</Header>
				<ChannelIcons>
					<StarIcon>
						<box-icon name='star' size='20px'></box-icon>
						<box-icon name='chevron-down' size='20px'></box-icon>
					</StarIcon>
					<BellIcon>
						<box-icon name='bell' size='20px'></box-icon>
						<span>Get Notifications for @ Mentions </span>
						<box-icon name='chevron-down' size='20px'></box-icon>
					</BellIcon>
					<PhoneIcon>
						<box-icon name='phone' size='20px'></box-icon>
						<span>Start a Call</span>
					</PhoneIcon>
				</ChannelIcons>
				<ChannelInfo>
					<div>About</div>
					<div>Members</div>
				</ChannelInfo>
				<SearchMember>
					<input type="text" placeholder='Find members' name="" id="" />
				</SearchMember>
				<MembersWrapper>
                    {membersList.map((item, index) => (
                        <Member key={index}>
							<MemberImage>
								<img src={userDefaultImage} alt="Member" />
							</MemberImage>
							<b>{item}</b>
                        </Member>
                    ))}
                </MembersWrapper>
			</Modal>
		</Container>
	);
};

export default ShowMembers;

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	z-index: 25;
`;

const Modal = styled.div`
	position: fixed;
	background: white;
	width: 100%;
	max-width: 600px;
	height: 600px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 10px;
	box-shadow: 0px 0px 25px 10px rgba(0, 0, 0, 0.2);
`;
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #1d1c1d;
	padding-top: 25px;
	padding-left: 25px;
	padding-right: 25px;
`;
const CloseIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	width: 35px;
	height: 35px;

	:hover {
		background: #f6f6f6;
	}
`;
const ChannelIcons = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-size: 14px;
	margin-top: 10px;
	padding-left: 25px;
	padding-right: 25px;
`
const StarIcon = styled.div`
	display: flex;
	padding: 4px 12px;
	margin-right: 10px;
	width: 60px;
	border: 1px solid #BBBABB;
	border-radius: 5px;
	cursor: pointer;

	:hover {
		background: #C8C8C8;
	}
`
const BellIcon = styled.div`
	display: flex;
	padding: 4px 12px;
	margin-right: 10px;
	border: 1px solid #BBBABB;
	border-radius: 5px;
	cursor: pointer;

	:hover {
		background: #C8C8C8;
	}
`
const PhoneIcon = styled.div`
	display: flex;
	padding: 4px 12px;
	margin-right: 10px;
	border: 1px solid #BBBABB;
	border-radius: 5px;
	cursor: pointer;

	:hover {
		background: #C8C8C8;
	}
`
const ChannelInfo = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;
	color: #000000;
	padding: 20px 25px 0px 25px;
	border-bottom: 1px solid #DDDDDD;

	div {
		padding-bottom: 5px;
		margin-right: 25px;
		cursor: pointer;

		:last-child {
			border-bottom: 2px solid #007A5A;
		}
	}
`
const SearchMember = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 10px;
	border-radius: 4px;
	padding-left: 25px;
	padding-right: 25px;
	height: 60px;
	width: 100%;

	input[type='text'] {
		height: 40px;
		width: 100%;
		padding: 10px;
		font-size: 16px;
		border-radius: 4px;
		border: 1px solid #bbbabb;
	}
	input[type='text']:hover {
		border: 1px solid #a8a7a8;
	}
	input[type='text']:focus {
		border: 1px solid #1264a3;
		box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
	}
`
const MembersWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 15px;
	color: #000000;
`
const Member = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 25px;
	width: 100%;
	:hover {
		background: #F6F6F6;
	}

`
const MemberImage = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 4px;
	margin-right: 10px;
	img {
		width: 100%;
	}
`